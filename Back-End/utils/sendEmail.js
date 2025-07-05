// utils/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Not your Gmail password — use App Password
    },
  });

  const mailOptions = {
    from: '"Book Borrow App" <your-email@gmail.com>',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
