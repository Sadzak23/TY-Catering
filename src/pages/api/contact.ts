import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, phone, eventDate, guests, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "TYC Form Submission",
      html: `
      <body>
      <h2>Contact Info</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone ?? "/"}</p>
      <h2>Event Info</h2>
      <p><strong>Event Date:</strong> ${eventDate}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <h2>Additional Message</h2>
      <p>${message ?? "/"}</p>
      </body>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Email send failed" });
  }
}
