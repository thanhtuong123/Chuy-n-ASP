using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
			ViewBag.OrderCount = _context.Orders.Count();
			ViewBag.CategoryCount = _context.Categories.Count();
            ViewBag.PostCount = _context.Posts.Count();
            ViewBag.ProductCount = _context.Products.Count();
            ViewBag.CustomerCount = _context.Customers.Count();
            ViewBag.UserCount = _context.Users.Count();
            return View();
        }
    }
}
