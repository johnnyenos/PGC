import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import cryptoRandomString from "crypto-random-string";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Change this to your verified SES sender email
const SENDER_EMAIL = "noreply@puregameclassic.com";

async function sendEmail(to: string, subject: string, htmlBody: string) {
  const command = new SendEmailCommand({
    Source: SENDER_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Html: { Data: htmlBody },
      },
    },
  });

  try {
    await ses.send(command);
  } catch (error: any) {
    if (error.Code === "MessageRejected" && error.message.includes("Email address is not verified")) {
      console.error(`Email address not verified. Please verify ${to} and ${SENDER_EMAIL} in AWS SES console.`);
      throw new Error("Email address not verified. Please check your AWS SES settings.");
    }
    throw error;
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.VITE_APP_URL}/verify-email?token=${token}`;
  const htmlBody = `
    <h1>Welcome to Pure Game Classic!</h1>
    <p>Please verify your email address by clicking the link below:</p>
    <a href="${verificationLink}">Verify Email</a>
    <p>This link will expire in 24 hours.</p>
    <p>If you didn't create an account, you can safely ignore this email.</p>
  `;

  await sendEmail(email, "Verify your Pure Game Classic account", htmlBody);
}

export async function sendGiveawayConfirmationEmail(email: string, name: string) {
  const htmlBody = `
    <h1>Thanks for Entering the Pure Game Classic Giveaway!</h1>
    <p>Dear ${name},</p>
    <p>Your entry for the Pure Game Classic giveaway has been received and recorded.</p>
    <p>Winners will be selected and notified after the event. Good luck!</p>
    <p>Thank you for being part of Pure Game Classic 2025!</p>
  `;

  await sendEmail(email, "Pure Game Classic Giveaway Entry Confirmation", htmlBody);
}

export function generateVerificationToken(): string {
  return cryptoRandomString({ length: 32, type: "url-safe" });
}