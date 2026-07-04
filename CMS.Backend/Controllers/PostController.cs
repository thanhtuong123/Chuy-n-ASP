using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public PostController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public IActionResult Index(int page = 1)
        {
            const int pageSize = 6;
            var query = _context.Posts
                .Include(p => p.Category)
                .OrderByDescending(p => p.CreatedDate)
                .AsQueryable();

            var totalItems = query.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            page = Math.Max(1, Math.Min(page, Math.Max(totalPages, 1)));

            var posts = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            ViewBag.CurrentPage = page;
            ViewBag.TotalPages = totalPages;

            return View(posts);
        }

        public IActionResult Details(int id)
        {
            var post = _context.Posts.Include(p => p.Category).FirstOrDefault(p => p.Id == id);
            if (post == null) return NotFound();
            return View(post);
        }

        [HttpGet]
        public IActionResult Create()
        {
            LoadCategories();
            return View();
        }

        [HttpPost]
        public IActionResult Create(Post model, IFormFile? imageFile)
        {
            if (ModelState.IsValid)
            {
                model.CreatedDate = DateTime.Now;
                model.ImageUrl = SaveImage(imageFile);
                _context.Posts.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            LoadCategories();
            return View(model);
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.Find(id);
            if (post == null) return NotFound();
            LoadCategories();
            return View(post);
        }

        [HttpPost]
        public IActionResult Edit(Post model, IFormFile? imageFile)
        {
            if (ModelState.IsValid)
            {
                var oldPost = _context.Posts.AsNoTracking().FirstOrDefault(p => p.Id == model.Id);
                if (oldPost == null) return NotFound();

                var newImage = SaveImage(imageFile);
                if (!string.IsNullOrEmpty(newImage))
                {
                    model.ImageUrl = newImage;
                }
                else
                {
                    model.ImageUrl = oldPost.ImageUrl;
                }

                model.CreatedDate = oldPost.CreatedDate;
                _context.Posts.Update(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            LoadCategories();
            return View(model);
        }

        [Authorize(Roles = "Admin")]
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

        private void LoadCategories()
        {
            ViewBag.Categories = new SelectList(_context.Categories.ToList(), "Id", "Name");
        }

        private string? SaveImage(IFormFile? imageFile)
        {
            if (imageFile == null || imageFile.Length == 0) return null;

            var uploadFolder = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFolder)) Directory.CreateDirectory(uploadFolder);

            var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            return "/uploads/" + fileName;
        }
    }
}
