using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

		// GET: api/ProductsApi?keyword=ao&categoryProductId=1&minPrice=100000&maxPrice=500000
		[HttpGet]
		public async Task<IActionResult> GetAll(
		 string? keyword,
		 int? categoryProductId,
		 decimal? minPrice,
		 decimal? maxPrice)
		{
			var query = _context.Products.AsQueryable();

			if (!string.IsNullOrWhiteSpace(keyword))
			{
				query = query.Where(x =>
					x.Name.Contains(keyword) ||
					x.Description.Contains(keyword));
			}

			if (categoryProductId.HasValue)
			{
				query = query.Where(x =>
					x.CategoryProductId == categoryProductId);
			}

			if (minPrice.HasValue)
			{
				query = query.Where(x =>
					x.Price >= minPrice);
			}

			if (maxPrice.HasValue)
			{
				query = query.Where(x =>
					x.Price <= maxPrice);
			}

			var data = await query
				.OrderByDescending(x => x.Id)
				.ToListAsync();

			return Ok(data);
		}

		[HttpGet("newest")]
		public async Task<IActionResult> GetNewestProducts()
		{
			var products = await _context.Products
				.OrderByDescending(x => x.Id)
				.Take(3)
				.ToListAsync();

			return Ok(products);
		}
		// GET: api/ProductsApi/1
		[HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .AsNoTracking()
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    id = p.Id,
                    name = p.Name,
                    description = p.Description,
                    price = p.Price,
                    stockQuantity = p.StockQuantity,
                    imageUrl = p.ImageUrl,
                    categoryProductId = p.CategoryProductId,
                    categoryProduct = p.CategoryProduct == null ? null : new
                    {
                        id = p.CategoryProduct.Id,
                        name = p.CategoryProduct.Name
                    }
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm." });
            }

            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Thêm sản phẩm thành công.",
                product
            });
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest(new { message = "ID không khớp." });
            }

            var oldProduct = await _context.Products.FindAsync(id);

            if (oldProduct == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm." });
            }

            oldProduct.Name = product.Name;
            oldProduct.Description = product.Description;
            oldProduct.Price = product.Price;
            oldProduct.StockQuantity = product.StockQuantity;
            oldProduct.ImageUrl = product.ImageUrl;
            oldProduct.CategoryProductId = product.CategoryProductId;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật sản phẩm thành công." });
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm." });
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa sản phẩm thành công." });
        }
		[HttpGet("bestseller")]
		public async Task<IActionResult> GetBestSellerProducts()
		{
			var products = await _context.OrderDetails
				.GroupBy(x => x.ProductId)
				.Select(x => new
				{
					ProductId = x.Key,
					TotalSold = x.Sum(i => i.Quantity)
				})
				.OrderByDescending(x => x.TotalSold)
				.Take(3)
				.Join(
					_context.Products,
					sold => sold.ProductId,
					product => product.Id,
					(sold, product) => product
				)
				.ToListAsync();

			return Ok(products);
		}
	}
}
