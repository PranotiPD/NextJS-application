// lib/mail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.SMTP_PASSCODE,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/activate/${token}`; // Nowy format URL
  await transporter.sendMail({
    from: '"Next Auth" ',
    to: email,
    subject: "Verify Your Email",
    html: `Please click on the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
  });
}

export async function sendResetPasswordEmail(email: string, token: string) {
    console.log("I am in mail.ts ");
  const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/api/auth/reset-password/${encodeURIComponent(token)}`;
  const response = await transporter.sendMail({
    from: '"Next Auth" ',
    to: email,
    subject: "Password Reset Request",
    html: `We received a request to reset your password for our app. Please click on the following link to reset your password: <a href="${resetPasswordUrl}">Reset Password</a>. If you did not request a password reset, please ignore this email.`,
  });
  console.log(response);
}

export async function sendNewPasswordEmail(email: string, newPassword: string) {
  await transporter.sendMail({
    from: '"Next Auth" ',  // `"Heading name" <your-email-address>`
    to: email,
    subject: "Your New Password",
    html: `Your password has been reset. Here is your new password: <strong>${newPassword}</strong>. It is recommended to change this password after logging in.`,
  });
}