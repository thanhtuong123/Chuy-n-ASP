using CMS.Backend.Services;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrdersApiController : ControllerBase
	{
		private readonly ApplicationDbContext _context;
		private readonly EmailService _emailService;

		public OrdersApiController(
			ApplicationDbContext context,
			EmailService emailService)
		{
			_context = context;
			_emailService = emailService;
		}

		// ==========================
		// DTO
		// ==========================

		public class CheckoutCustomer
		{
			public string FullName { get; set; } = "";

			public string Email { get; set; } = "";

			public string Phone { get; set; } = "";

			public string Address { get; set; } = "";
		}

		public class CartItem
		{
			public int ProductId { get; set; }

			public int Quantity { get; set; }
		}

		public class CheckoutRequest
		{
			public CheckoutCustomer Customer { get; set; } = new();

			public List<CartItem> Items { get; set; } = new();

			public string? Notes { get; set; }
		}

		// ==========================
		// LỊCH SỬ ĐƠN HÀNG
		// ==========================

		[HttpGet("history/{email}")]
		public async Task<IActionResult> OrderHistory(string email)
		{
			var orders = await _context.Orders
				.Include(x => x.Customer)
				.Include(x => x.OrderDetails)
				.ThenInclude(x => x.Product)
				.Where(x => x.Customer.Email == email)
				.OrderByDescending(x => x.OrderDate)
				.Select(x => new
				{
					x.Id,
					x.OrderDate,
					x.Status,
					Total = x.OrderDetails.Sum(d => d.UnitPrice * d.Quantity)
				})
				.ToListAsync();

			return Ok(orders);
		}

		// ==========================
		// CHI TIẾT ĐƠN HÀNG
		// ==========================

		[HttpGet("{id}")]
		public async Task<IActionResult> GetOrder(int id)
		{
			var order = await _context.Orders
				.Include(x => x.Customer)
				.Include(x => x.OrderDetails)
				.ThenInclude(x => x.Product)
				.FirstOrDefaultAsync(x => x.Id == id);

			if (order == null)
			{
				return NotFound(new
				{
					message = "Không tìm thấy đơn hàng."
				});
			}

			return Ok(new
			{
				order.Id,
				order.OrderDate,
				order.Status,
				order.Notes,

				customer = new
				{
					order.Customer.FullName,
					order.Customer.Email,
					order.Customer.Phone,
					order.Customer.Address
				},

				items = order.OrderDetails.Select(x => new
				{
					x.ProductId,
					ProductName = x.Product.Name,
					x.Quantity,
					x.UnitPrice,
					Total = x.Quantity * x.UnitPrice
				}),

				total = order.OrderDetails.Sum(x => x.Quantity * x.UnitPrice)
			});
		}

		// ==========================
		// ĐẶT HÀNG
		// ==========================

		[HttpPost]
		public async Task<IActionResult> Checkout(CheckoutRequest request)
		{
			if (request.Items == null || !request.Items.Any())
			{
				return BadRequest(new
				{
					message = "Giỏ hàng trống."
				});
			}

			using var transaction = await _context.Database.BeginTransactionAsync();

			try
			{
				Customer? customer = await _context.Customers
					.FirstOrDefaultAsync(x => x.Email == request.Customer.Email);

				if (customer == null)
				{
					customer = new Customer
					{
						FullName = request.Customer.FullName,
						Email = request.Customer.Email,
						Phone = request.Customer.Phone,
						Address = request.Customer.Address,
						Password = ""
					};

					_context.Customers.Add(customer);
					await _context.SaveChangesAsync();
				}

				Order order = new()
				{
					CustomerId = customer.Id,
					OrderDate = DateTime.Now,
					Status = 0,
					Notes = request.Notes
				};

				_context.Orders.Add(order);
				await _context.SaveChangesAsync();

				foreach (var item in request.Items)
				{
					var product = await _context.Products.FindAsync(item.ProductId);

					if (product == null)
					{
						await transaction.RollbackAsync();

						return BadRequest(new
						{
							message = $"Không tìm thấy sản phẩm có ID = {item.ProductId}"
						});
					}

					if (product.StockQuantity < item.Quantity)
					{
						await transaction.RollbackAsync();

						return BadRequest(new
						{
							message = $"Sản phẩm {product.Name} không đủ tồn kho."
						});
					}

					product.StockQuantity -= item.Quantity;

					_context.OrderDetails.Add(new OrderDetail
					{
						OrderId = order.Id,
						ProductId = product.Id,
						Quantity = item.Quantity,
						UnitPrice = product.Price
					});
				}

				await _context.SaveChangesAsync();

				await transaction.CommitAsync();

				await _emailService.SendEmail(
					customer.Email,
					"Xác nhận đơn hàng",
					$@"
<h2>Cảm ơn {customer.FullName}</h2>

<p>Đơn hàng của bạn đã được tạo thành công.</p>

<p><b>Mã đơn:</b> {order.Id}</p>

<p><b>Ngày đặt:</b> {order.OrderDate:dd/MM/yyyy HH:mm}</p>

<p>Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>

<hr>

<p>TuongCMS Fashion</p>
");

				return Ok(new
				{
					message = "Đặt hàng thành công.",
					orderId = order.Id
				});
			}
			catch (Exception ex)
			{
				await transaction.RollbackAsync();

				return BadRequest(new
				{
					message = ex.Message,
					detail = ex.InnerException?.Message
				});
			}
		}
	}
}