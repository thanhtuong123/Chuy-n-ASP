using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CMS.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Post> Posts { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
		public DbSet<CategoryProduct> CategoryProducts { get; set; } = null!;
		public DbSet<Product> Products { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderDetail> OrderDetails { get; set; } = null!;
		public DbSet<PasswordOtp> PasswordOtps { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Tin Công Nghệ", Description = "Review Laptop, AI" },
                new Category { Id = 2, Name = "Giáo Dục", Description = "Thông tin tuyển sinh" },
                new Category { Id = 3, Name = "Tin Thời Sự", Description = "Tin tức cập nhật hằng ngày" }
            );

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", FullName = "Quản trị viên", PasswordHash = "123456", Role = "Admin" },
                new User { Id = 2, Username = "editor", FullName = "Biên tập viên", PasswordHash = "123456", Role = "Editor" },
                new User { Id = 3, Username = "user", FullName = "Người dùng thường", PasswordHash = "123456", Role = "User" }
            );

            modelBuilder.Entity<CategoryProduct>().HasData(
                new CategoryProduct { Id = 1, Name = "Laptop", Description = "Máy tính xách tay" },
                new CategoryProduct { Id = 2, Name = "Phụ kiện", Description = "Chuột, bàn phím, tai nghe" }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post { Id = 1, Title = "Lộ trình học ASP.NET Core cho người mới", Content = "Nội dung bài viết về lộ trình học .NET và cách xây dựng CMS.", ImageUrl = "https://via.placeholder.com/600x300", CreatedDate = new DateTime(2026, 1, 1, 8, 0, 0), CategoryId = 1 },
                new Post { Id = 2, Title = "ReactJS và WebAPI", Content = "Nội dung bài viết về React gọi API từ ASP.NET Core Backend.", ImageUrl = "https://via.placeholder.com/600x300", CreatedDate = new DateTime(2026, 1, 2, 8, 0, 0), CategoryId = 1 }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Laptop học lập trình", Description = "Laptop cấu hình cơ bản", Price = 15000000, StockQuantity = 10, CategoryProductId = 1 },
                new Product { Id = 2, Name = "Chuột không dây", Description = "Chuột văn phòng", Price = 250000, StockQuantity = 50, CategoryProductId = 2 }
            );

            modelBuilder.Entity<Customer>().HasData(
                new Customer { Id = 1, FullName = "Khách hàng mẫu", Email = "customer@example.com", Phone = "0900000000", Address = "TP.HCM", Password = "123456" }
            );
        }
    }
}
