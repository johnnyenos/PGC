import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import cryptoRandomString from "crypto-random-string";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.VITE_APP_URL}/verify-email?token=${token}`;

  const command = new SendEmailCommand({
    Source: "noreply@puregameclassic.com", // Replace with your verified SES email
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Verify your Pure Game Classic account",
      },
      Body: {
        Html: {
          Data: `
            <h1>Welcome to Pure Game Classic!</h1>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${verificationLink}">Verify Email</a>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
          `,
        },
      },
    },
  });

  await ses.send(command);
}

export function generateVerificationToken(): string {
  return cryptoRandomString({ length: 32, type: "url-safe" });
}
