using System.Collections.Generic;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
		[Authorize(Roles = "Admin")]
		public IActionResult Index()
        {
            // Tạo dữ liệu giả cho tài khoản quản trị hệ thống (Trang 16)
            var users = new List<User>
            {
                new User { Id = 1, Username = "admin_thai", FullName = "Nguyễn Cao Thái", Role = "Admin" },
                new User { Id = 2, Username = "editor_bin", FullName = "Lê Thanh Tường", Role = "Editor" },
                new User { Id = 3, Username = "author_minh", FullName = "Lê Quang Minh", Role = "Author" }
            };

            return View(users);
        }
    }
}