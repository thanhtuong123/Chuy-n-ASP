using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
	[Authorize(Roles = "Admin,Editor")]
	public class CategoryProductController : Controller
	{
		private readonly ApplicationDbContext _context;

		public CategoryProductController(ApplicationDbContext context)
		{
			_context = context;
		}

		public IActionResult Index()
		{
			var categories = _context.CategoryProducts.ToList();
			return View(categories);
		}

		[HttpGet]
		public IActionResult Create()
		{
			return View();
		}

		[HttpPost]
		public IActionResult Create(CategoryProduct model)
		{
			if (ModelState.IsValid)
			{
				_context.CategoryProducts.Add(model);
				_context.SaveChanges();
				return RedirectToAction("Index");
			}

			return View(model);
		}

		[HttpGet]
		public IActionResult Edit(int id)
		{
			var category = _context.CategoryProducts.Find(id);

			if (category == null)
			{
				return NotFound();
			}

			return View(category);
		}

		[HttpPost]
		public IActionResult Edit(CategoryProduct model)
		{
			if (ModelState.IsValid)
			{
				_context.CategoryProducts.Update(model);
				_context.SaveChanges();
				return RedirectToAction("Index");
			}

			return View(model);
		}

		public IActionResult Delete(int id)
		{
			var category = _context.CategoryProducts.Find(id);

			if (category != null)
			{
				_context.CategoryProducts.Remove(category);
				_context.SaveChanges();
			}

			return RedirectToAction("Index");
		}
	}
}