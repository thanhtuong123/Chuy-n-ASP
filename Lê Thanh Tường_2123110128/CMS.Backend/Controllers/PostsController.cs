using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PostsController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public PostsController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var posts = _context.Posts
				.Include(p => p.Category)
				.OrderByDescending(p => p.CreatedDate)
				.Select(p => new
				{
					p.Id,
					p.Title,
					p.Content,
					p.ImageUrl,
					p.CreatedDate,
					p.CategoryId,
					CategoryName = p.Category != null ? p.Category.Name : ""
				})
				.ToList();

			return Ok(posts);
		}

		[HttpGet("{id}")]
		public IActionResult GetById(int id)
		{
			var post = _context.Posts
				.Include(p => p.Category)
				.Where(p => p.Id == id)
				.Select(p => new
				{
					p.Id,
					p.Title,
					p.Content,
					p.ImageUrl,
					p.CreatedDate,
					p.CategoryId,
					CategoryName = p.Category != null ? p.Category.Name : ""
				})
				.FirstOrDefault();

			if (post == null)
			{
				return NotFound();
			}

			return Ok(post);
		}

		[HttpGet("category/{categoryId}")]
		public IActionResult GetByCategory(int categoryId)
		{
			var posts = _context.Posts
				.Include(p => p.Category)
				.Where(p => p.CategoryId == categoryId)
				.OrderByDescending(p => p.CreatedDate)
				.Select(p => new
				{
					p.Id,
					p.Title,
					p.Content,
					p.ImageUrl,
					p.CreatedDate,
					p.CategoryId,
					CategoryName = p.Category != null ? p.Category.Name : ""
				})
				.ToList();

			return Ok(posts);
		}

		[HttpPost]
		public IActionResult Create(Post model)
		{
			model.CreatedDate = DateTime.Now;

			_context.Posts.Add(model);
			_context.SaveChanges();

			return Ok(model);
		}

		[HttpPut("{id}")]
		public IActionResult Update(int id, Post model)
		{
			var post = _context.Posts.Find(id);

			if (post == null)
			{
				return NotFound();
			}

			post.Title = model.Title;
			post.Content = model.Content;
			post.ImageUrl = model.ImageUrl;
			post.CategoryId = model.CategoryId;

			_context.SaveChanges();

			return Ok(post);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			var post = _context.Posts.Find(id);

			if (post == null)
			{
				return NotFound();
			}

			_context.Posts.Remove(post);
			_context.SaveChanges();

			return Ok(new
			{
				message = "Xóa bài viết thành công",
				id = id
			});
		}
	}
}