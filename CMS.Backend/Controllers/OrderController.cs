using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
	[Authorize(Roles = "Admin,Editor")]
	public class OrderController : Controller
	{
		private readonly ApplicationDbContext _context;

		public OrderController(ApplicationDbContext context)
		{
			_context = context;
		}

		// Danh sách đơn hàng
		public async Task<IActionResult> Index()
		{
			var orders = await _context.Orders
				.Include(o => o.Customer)
				.OrderByDescending(o => o.OrderDate)
				.ToListAsync();

			return View(orders);
		}

		// Chi tiết đơn hàng
		public async Task<IActionResult> Details(int id)
		{
			var order = await _context.Orders
				.Include(o => o.Customer)
				.Include(o => o.OrderDetails)
					.ThenInclude(d => d.Product)
				.FirstOrDefaultAsync(o => o.Id == id);

			if (order == null)
				return NotFound();

			return View(order);
		}

		// Sửa trạng thái
		[HttpGet]
		public async Task<IActionResult> Edit(int id)
		{
			var order = await _context.Orders.FindAsync(id);

			if (order == null)
				return NotFound();

			return View(order);
		}

		[HttpPost]
		public async Task<IActionResult> Edit(Order model)
		{
			var order = await _context.Orders.FindAsync(model.Id);

			if (order == null)
				return NotFound();

			order.Status = model.Status;
			order.Notes = model.Notes;

			await _context.SaveChangesAsync();

			return RedirectToAction(nameof(Index));
		}

		// Xóa đơn hàng
		public async Task<IActionResult> Delete(int id)
		{
			var order = await _context.Orders
				.Include(x => x.OrderDetails)
				.FirstOrDefaultAsync(x => x.Id == id);

			if (order == null)
				return RedirectToAction(nameof(Index));

			_context.OrderDetails.RemoveRange(order.OrderDetails);
			_context.Orders.Remove(order);

			await _context.SaveChangesAsync();

			return RedirectToAction(nameof(Index));
		}
	}
}