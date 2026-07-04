using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace CMS.Backend.Services
{
	public class EmailService
	{
		private readonly EmailSettings _settings;

		public EmailService(IOptions<EmailSettings> settings)
		{
			_settings = settings.Value;
		}

		public async Task SendEmail(string to, string subject, string body)
		{
			var email = new MimeMessage();

			email.From.Add(
				new MailboxAddress(
					_settings.DisplayName,
					_settings.Mail));

			email.To.Add(
				MailboxAddress.Parse(to));

			email.Subject = subject;

			email.Body = new TextPart("html")
			{
				Text = body
			};

			using var smtp = new MailKit.Net.Smtp.SmtpClient();

			await smtp.ConnectAsync(
				_settings.Host,
				_settings.Port,
				SecureSocketOptions.StartTls);

			await smtp.AuthenticateAsync(
				_settings.Mail,
				_settings.Password);

			await smtp.SendAsync(email);

			await smtp.DisconnectAsync(true);
		}
	}
}