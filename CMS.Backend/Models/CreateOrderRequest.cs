using System.ComponentModel.DataAnnotations;

namespace CMS.Backend.Models
{
    public class CreateOrderRequest
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        public string? Email { get; set; }

        public string? Note { get; set; }

        [MinLength(1)]
        public List<CreateOrderItemRequest> Items { get; set; } = [];
    }

    public class CreateOrderItemRequest
    {
        [Range(1, int.MaxValue)]
        public int ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}

