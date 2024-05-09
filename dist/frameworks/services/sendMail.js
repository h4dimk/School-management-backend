"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv").config();
class SendMail {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    sendEmail(name, email, password) {
        return new Promise((resolve, reject) => {
            const mailOptions = {
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
                }
                else {
                    resolve({
                        success: true,
                    });
                }
            });
        });
    }
}
exports.SendMail = SendMail;
//# sourceMappingURL=sendMail.js.map