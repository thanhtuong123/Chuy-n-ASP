using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryPostsController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public CategoryPostsController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> GetAll()
		{
			var categories = await _context.Categories
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