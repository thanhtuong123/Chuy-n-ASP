namespace CMS.Data.Entities
{
	public class PasswordOtp
	{
		public int Id { get; set; }

		public string Email { get; set; } = "";

		public string Otp { get; set; } = "";

		public DateTime ExpiredAt { get; set; }

		public bool IsUsed { get; set; }
	}
}