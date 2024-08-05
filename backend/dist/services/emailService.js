"use strict";
// src/services/sendEmailService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class SendEmailService {
    async execute(name, email, message) {
        // const transporter = nodemailer.createTransport({
        //   host: "sandbox.smtp.mailtrap.io",
        //   port: 2525,
        //   auth: {
        //     user: "43c5bb674fc4bb",
        //     pass: "369a1b066399e0"
        //   }
        // });
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: 'lexjustin5@gmail.com',
                pass: 'bzmqnysinbgtgjye', //senha do meu app  criei la na minha conta do google  https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4OGDNDSIQ65OpwQuC_slBvW3BV9fEBe9g3_3SdC2wbKtwlxKHDE2tHI6fh94vievLuMdHWmbbUkzSQycQq-hR1t_cIrGU3v93hITjXJInjVNN9eWMs
            },
        });
        const mailOptions = {
            from: email, /// quem e via o email
            to: 'alex.sandroalvesdelima@hotmail.com', /// para quem vai 
            subject: 'New message from contact form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };
        return transporter.sendMail(mailOptions);
    }
}
exports.SendEmailService = SendEmailService;
