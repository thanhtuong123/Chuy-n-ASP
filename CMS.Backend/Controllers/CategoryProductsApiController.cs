using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryProductsApiController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public CategoryProductsApiController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> GetCategoryProducts()
		{
			var categories = await _context.CategoryProducts
				.OrderBy(c => c.Id)
				.Select(c => new
				{
					id = c.Id,
					name = c.Name,
					description = c.Description
				})
				.ToListAsync();

			return Ok(categories);
		}
	}
}