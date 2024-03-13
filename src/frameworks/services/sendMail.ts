import nodemailer from "nodemailer";
import { ISendEmail } from "../../useCases/interface/services/sendMail";
require("dotenv").config();

export class SendMail implements ISendEmail {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean }> {
    return new Promise((resolve, reject) => {
      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Your School Management System Login Details",
        text: `Hello ${name},\n\nYour login credentials for the School Management System are:\nEmail: ${email}\nPassword: ${password}\n\nPlease use these credentials to log in.\n\nBest regards,\nSchool Management Team`,
      };

      this.transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error(err.message);
          reject({
            success: false,
          });
        } else {
          resolve({
            success: true,
          });
        }
      });
    });
  }
}
