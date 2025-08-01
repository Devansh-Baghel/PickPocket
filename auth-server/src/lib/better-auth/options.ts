import { BetterAuthOptions } from 'better-auth';
import { magicLink } from 'better-auth/plugins';
import { Resend } from "resend";

/**
 * Send magic link email using Resend
 */
async function sendMagicLinkEmail(email: string, url: string, token: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sign in to PickPocket</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
        }
        .header {
          text-align: center;
          margin-bottom: 32px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 8px;
        }
        .title {
          color: #1f2937;
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 16px 0;
        }
        .subtitle {
          color: #6b7280;
          font-size: 16px;
          margin: 0 0 32px 0;
        }
        .button {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin: 16px 0;
          transition: background-color 0.2s;
        }
        .button:hover {
          background-color: #1d4ed8;
        }
        .link-section {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          margin: 24px 0;
        }
        .link-label {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 8px;
        }
        .magic-link {
          word-break: break-all;
          color: #2563eb;
          text-decoration: none;
          font-size: 14px;
        }
        .footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }
        .footer-text {
          color: #6b7280;
          font-size: 14px;
          margin: 8px 0;
        }
        .security-note {
          background-color: #fef3c7;
          border: 1px solid #fde68a;
          border-radius: 6px;
          padding: 16px;
          margin: 24px 0;
        }
        .security-note-title {
          font-weight: 600;
          color: #92400e;
          margin-bottom: 4px;
        }
        .security-note-text {
          color: #b45309;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          .container {
            padding: 24px;
          }
          .button {
            display: block;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">📖 PickPocket</div>
          <h1 class="title">Sign in to your account</h1>
          <p class="subtitle">Click the button below to securely sign in to PickPocket</p>
        </div>

        <div style="text-align: center;">
          <a href="${url}" class="button">Sign In to PickPocket</a>
        </div>

        <div class="link-section">
          <div class="link-label">Or copy and paste this link in your browser:</div>
          <a href="${url}" class="magic-link">${url}</a>
        </div>

        <div class="security-note">
          <div class="security-note-title">🔒 Security Information</div>
          <div class="security-note-text">
            This link will expire in 5 minutes for your security. If you didn't request this sign-in link, you can safely ignore this email.
          </div>
        </div>

        <div class="footer">
          <p class="footer-text">
            This email was sent to <strong>${email}</strong>
          </p>
          <p class="footer-text">
            If you have any questions, contact our support team.
          </p>
          <p class="footer-text" style="margin-top: 16px; font-size: 12px;">
            © 2025 PickPocket. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "PickPocket <pickpocket@baghel.dev>",
      to: [email],
      subject: "Sign in to PickPocket",
      html: emailHtml,
    });

    if (error) {
      console.error("Failed to send magic link email:", error);
      throw new Error("Failed to send email");
    }

    console.log("Magic link email sent successfully:", data);
  } catch (error) {
    console.error("Error sending magic link email:", error);
    throw error;
  }
}

/**
 * Custom options for Better Auth
 */
export const betterAuthOptions: BetterAuthOptions = {
  appName: "PickPocket",
  basePath: "/api",
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await sendMagicLinkEmail(email, url, token);
      },
      expiresIn: 10 * 60, // 10 minutes
    }),
  ],
};
