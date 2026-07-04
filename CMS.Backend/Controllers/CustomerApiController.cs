using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CustomerApiController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public CustomerApiController(ApplicationDbContext context)
		{
			_context = context;
		}

		// =========================
		// LOGIN
		// =========================

		[HttpPost("login")]
		public async Task<IActionResult> Login(CustomerLoginRequest request)
		{
			var customer = await _context.Customers
				.FirstOrDefaultAsync(x => x.Email == request.Email);

			if (customer == null)
			{
				return BadRequest(new
				{
					message = "Email hoặc mật khẩu không đúng."
				});
			}

			bool ok = BCrypt.Net.BCrypt.Verify(
				request.Password,
				customer.Password
			);

			if (!ok)
			{
				return BadRequest(new
				{
					message = "Email hoặc mật khẩu không đúng."
				});
			}

			return Ok(new
			{
				customer.Id,
				customer.FullName,
				customer.Email,
				customer.Phone,
				customer.Address
			});
		}

		// =========================
		// REGISTER
		// =========================

		[HttpPost("register")]
		public async Task<IActionResult> Register(CustomerRegisterRequest request)
		{
			bool exists = await _context.Customers
				.AnyAsync(x => x.Email == request.Email);

			if (exists)
			{
				return BadRequest(new
				{
					message = "Email đã tồn tại."
				});
			}

			Customer customer = new Customer
			{
				FullName = request.FullName,
				Email = request.Email,
				Phone = request.Phone,
				Address = request.Address,
				Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
			};

			_context.Customers.Add(customer);

			await _context.SaveChangesAsync();

			return Ok(new
			{
				message = "Đăng ký thành công."
			});
		}

		// =========================
		// FORGOT PASSWORD
		// =========================

		[HttpPost("forgot-password")]
		public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request)
		{
			var customer = await _context.Customers
				.FirstOrDefaultAsync(x => x.Email == request.Email);

			if (customer == null)
			{
				return BadRequest(new
				{
					message = "Email không tồn tại."
				});
			}

			return Ok(new
			{
				message = "Email hợp lệ."
			});
		}
		// =========================
		// CHANGE PASSWORD
		// =========================

		[HttpPost("change-password")]
		public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
		{
			var customer = await _context.Customers
				.FirstOrDefaultAsync(x => x.Email == request.Email);

			if (customer == null)
			{
				return BadRequest(new
				{
					message = "Không tìm thấy tài khoản."
				});
			}

			bool check = BCrypt.Net.BCrypt.Verify(
				request.OldPassword,
				customer.Password
			);

			if (!check)
			{
				return BadRequest(new
				{
					message = "Mật khẩu cũ không đúng."
				});
			}

			customer.Password = BCrypt.Net.BCrypt.HashPassword(
				request.NewPassword
			);

			await _context.SaveChangesAsync();

			return Ok(new
			{
				message = "Đổi mật khẩu thành công."
			});
		}
		// =========================
		// DTO
		// =========================

		public class CustomerLoginRequest
		{
			public string Email { get; set; } = "";

			public string Password { get; set; } = "";
		}

		public class CustomerRegisterRequest
		{
			public string FullName { get; set; } = "";

			public string Email { get; set; } = "";

			public string Phone { get; set; } = "";

			public string Address { get; set; } = "";

			public string Password { get; set; } = "";
		}

		public class ForgotPasswordRequest
		{
			public string Email { get; set; } = "";
		}
		public class ChangePasswordRequest
		{
			public string Email { get; set; } = "";

			public string OldPassword { get; set; } = "";

			public string NewPassword { get; set; } = "";
		}
	}
}