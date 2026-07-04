using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PostsApiController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public PostsApiController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
		{
			var query = _context.Posts
				.Include(p => p.Category)
				.AsQueryable();

			if (categoryId.HasValue && categoryId.Value > 0)
			{
				query = query.Where(p => p.CategoryId == categoryId.Value);
			}

			var posts = await query
				.OrderByDescending(p => p.CreatedDate)
				.Select(p => new
				{
					id = p.Id,
					title = p.Title,
					content = p.Content,
					createdDate = p.CreatedDate,
					categoryId = p.CategoryId,
					category = p.Category == null ? null : new
					{
						id = p.Category.Id,
						name = p.Category.Name
					}
				})
				.ToListAsync();

			return Ok(posts);
		}

		[HttpGet("{id}")]
		[AllowAnonymous]
		public async Task<IActionResult> GetDetail(int id)
		{
			var post = await _context.Posts
				.Include(p => p.Category)
				.Where(p => p.Id == id)
				.Select(p => new
				{
					id = p.Id,
					title = p.Title,
					content = p.Content,
					createdDate = p.CreatedDate,
					categoryId = p.CategoryId,
					category = p.Category == null ? null : new
					{
						id = p.Category.Id,
						name = p.Category.Name
					}
				})
				.FirstOrDefaultAsync();

			if (post == null)
			{
				return NotFound(new { message = "Không tìm thấy bài viết." });
			}

			return Ok(post);
		}
	}
}