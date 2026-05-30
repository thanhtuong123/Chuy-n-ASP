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

		public DbSet<Category> Categories { get; set; }
		public DbSet<Post> Posts { get; set; }
		public DbSet<User> Users { get; set; }
	}
}