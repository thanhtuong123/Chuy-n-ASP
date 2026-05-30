using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
	[Authorize]
	public class PostController : Controller
	{
		private readonly ApplicationDbContext _context;

		public PostController(ApplicationDbContext context)
		{
			_context = context;
		}

		public IActionResult Index(int? id)
		{
			var posts = _context.Posts
				.Include(p => p.Category)
				.AsQueryable();

			if (id != null)
			{
				posts = posts.Where(p => p.CategoryId == id);
			}

			var data = posts
				.OrderByDescending(p => p.CreatedDate)
				.ToList();

			return View(data);
		}

		public IActionResult Details(int id)
		{
			var post = _context.Posts
				.Include(p => p.Category)
				.FirstOrDefault(p => p.Id == id);

			if (post == null)
			{
				return NotFound();
			}

			return View(post);
		}

		[HttpGet]
		public IActionResult Create()
		{
			ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name");
			return View();
		}

		[HttpPost]
		public IActionResult Create(Post model, IFormFile? uploadImage)
		{
			if (uploadImage != null && uploadImage.Length > 0)
			{
				string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

				if (!Directory.Exists(folder))
				{
					Directory.CreateDirectory(folder);
				}

				string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
				string filePath = Path.Combine(folder, fileName);

				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					uploadImage.CopyTo(stream);
				}

				model.ImageUrl = "/uploads/" + fileName;
			}

			model.CreatedDate = DateTime.Now;

			_context.Posts.Add(model);
			_context.SaveChanges();

			return RedirectToAction("Index");
		}

		[HttpGet]
		public IActionResult Edit(int id)
		{
			var post = _context.Posts.Find(id);

			if (post == null)
			{
				return NotFound();
			}

			ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", post.CategoryId);

			return View(post);
		}

		[HttpPost]
		public IActionResult Edit(Post model, IFormFile? uploadImage)
		{
			var post = _context.Posts.Find(model.Id);

			if (post == null)
			{
				return NotFound();
			}

			post.Title = model.Title;
			post.Content = model.Content;
			post.CategoryId = model.CategoryId;

			if (uploadImage != null && uploadImage.Length > 0)
			{
				string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

				if (!Directory.Exists(folder))
				{
					Directory.CreateDirectory(folder);
				}

				string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
				string filePath = Path.Combine(folder, fileName);

				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					uploadImage.CopyTo(stream);
				}

				post.ImageUrl = "/uploads/" + fileName;
			}

			_context.SaveChanges();

			return RedirectToAction("Index");
		}

		public IActionResult Delete(int id)
		{
			var post = _context.Posts.Find(id);

			if (post != null)
			{
				_context.Posts.Remove(post);
				_context.SaveChanges();
			}

			return RedirectToAction("Index");
		}
	}
}