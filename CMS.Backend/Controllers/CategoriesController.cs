using CMS.Data;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoriesController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public CategoriesController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var categories = _context.Categories
				.Select(c => new
				{
					c.Id,
					c.Name,
					c.Description
				})
				.ToList();

			return Ok(categories);
		}

		[HttpGet("{id}")]
		public IActionResult GetById(int id)
		{
			var category = _context.Categories
				.Where(c => c.Id == id)
				.Select(c => new
				{
					c.Id,
					c.Name,
					c.Description
				})
				.FirstOrDefault();

			if (category == null)
			{
				return NotFound();
			}

			return Ok(category);
		}
	}
}