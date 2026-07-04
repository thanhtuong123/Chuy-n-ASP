using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
	public class Product
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Tên sản phẩm không được để trống")]
		public string Name { get; set; }

		public string? Description { get; set; }

		[Required(ErrorMessage = "Giá sản phẩm không được để trống")]
		public decimal Price { get; set; }

		public int StockQuantity { get; set; }

		public string? ImageUrl { get; set; }

		public int? CategoryProductId { get; set; }

		public CategoryProduct? CategoryProduct { get; set; }

	}
}