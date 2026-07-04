using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
	[Authorize(Roles = "Admin,Editor")]
	public class ProductController : Controller
	{
		private readonly ApplicationDbContext _context;
		private readonly IWebHostEnvironment _environment;

		public ProductController(ApplicationDbContext context, IWebHostEnvironment environment)
		{
			_context = context;
			_environment = environment;
		}

		public IActionResult Index(int page = 1)
		{
			const int pageSize = 6;
			var query = _context.Products
				.Include(p => p.CategoryProduct)
				.OrderByDescending(p => p.Id)
				.AsQueryable();

			var totalItems = query.Count();
			var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
			page = Math.Max(1, Math.Min(page, Math.Max(totalPages, 1)));

			var products = query
				.Skip((page - 1) * pageSize)
				.Take(pageSize)
				.ToList();

			ViewBag.CurrentPage = page;
			ViewBag.TotalPages = totalPages;

			return View(products);
		}

		public IActionResult Details(int id)
		{
			var product = _context.Products
				.Include(p => p.CategoryProduct)
				.FirstOrDefault(p => p.Id == id);

			if (product == null)
			{
				return NotFound();
			}

			return View(product);
		}

		[HttpGet]
		public IActionResult Create()
		{
			LoadCategoryProduct();
			return View();
		}

		[HttpPost]
		public async Task<IActionResult> Create(Product model, IFormFile? imageFile)
		{
			if (ModelState.IsValid)
			{
				if (imageFile != null && imageFile.Length > 0)
				{
					model.ImageUrl = await UploadImage(imageFile);
				}

				_context.Products.Add(model);
				await _context.SaveChangesAsync();

				return RedirectToAction("Index");
			}

			LoadCategoryProduct();
			return View(model);
		}

		[HttpGet]
		public IActionResult Edit(int id)
		{
			var product = _context.Products.Find(id);

			if (product == null)
			{
				return NotFound();
			}

			LoadCategoryProduct();
			return View(product);
		}

		[HttpPost]
		public async Task<IActionResult> Edit(Product model, IFormFile? imageFile)
		{
			if (ModelState.IsValid)
			{
				var oldProduct = await _context.Products.AsNoTracking()
					.FirstOrDefaultAsync(p => p.Id == model.Id);

				if (oldProduct == null)
				{
					return NotFound();
				}

				if (imageFile != null && imageFile.Length > 0)
				{
					model.ImageUrl = await UploadImage(imageFile);
				}
				else
				{
					model.ImageUrl = oldProduct.ImageUrl;
				}

				_context.Products.Update(model);
				await _context.SaveChangesAsync();

				return RedirectToAction("Index");
			}

			LoadCategoryProduct();
			return View(model);
		}

		public IActionResult Delete(int id)
		{
			var product = _context.Products.Find(id);

			if (product != null)
			{
				_context.Products.Remove(product);
				_context.SaveChanges();
			}

			return RedirectToAction("Index");
		}

		private void LoadCategoryProduct()
		{
			ViewBag.CategoryProductId = new SelectList(
				_context.CategoryProducts.ToList(),
				"Id",
				"Name"
			);
		}

		private async Task<string> UploadImage(IFormFile imageFile)
		{
			var uploadFolder = Path.Combine(_environment.WebRootPath, "uploads", "products");

			if (!Directory.Exists(uploadFolder))
			{
				Directory.CreateDirectory(uploadFolder);
			}

			var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
			var filePath = Path.Combine(uploadFolder, fileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await imageFile.CopyToAsync(stream);
			}

			return "/uploads/products/" + fileName;
		}
	}
}
