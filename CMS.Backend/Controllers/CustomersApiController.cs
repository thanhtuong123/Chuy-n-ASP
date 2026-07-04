using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CustomersApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CustomersApiController(ApplicationDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers() => await _context.Customers.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            return customer == null ? NotFound("Không tìm thấy khách hàng.") : customer;
        }
		
		public class ChangePasswordRequest
		{
			public string Email { get; set; } = "";

			public string OldPassword { get; set; } = "";

			public string NewPassword { get; set; } = "";
		}
		[HttpPost]
        public async Task<ActionResult<Customer>> CreateCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            if (id != customer.Id) return BadRequest("ID không khớp.");
            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok("Cập nhật khách hàng thành công.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return NotFound("Không tìm thấy khách hàng.");
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return Ok("Xóa khách hàng thành công.");
        }
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
				customer.Password);

			if (!check)
			{
				return BadRequest(new
				{
					message = "Mật khẩu cũ không đúng."
				});
			}

			customer.Password = BCrypt.Net.BCrypt.HashPassword(
				request.NewPassword);

			await _context.SaveChangesAsync();

			return Ok(new
			{
				message = "Đổi mật khẩu thành công."
			});
		}
	}
}
