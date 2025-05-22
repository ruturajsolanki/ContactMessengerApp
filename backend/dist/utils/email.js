"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReplyNotification = exports.sendNewMessageNotification = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendEmail = async (options) => {
    try {
        console.log('Creating email transporter...');
        console.log('SMTP User:', process.env.SMTP_USER);
        const mailOptions = {
            from: `"Contact Form" <${process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html || options.text,
        };
        console.log('Sending email with options:', {
            to: mailOptions.to,
            subject: mailOptions.subject,
        });
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
exports.sendEmail = sendEmail;
const sendNewMessageNotification = async (message) => {
    try {
        console.log('Sending new message notification...');
        const subject = 'New Contact Form Message';
        const text = `
      New message received:
      
      From: ${message.name} (${message.email})
      Subject: ${message.subject}
      Message: ${message.message}
    `;
        const html = `
      <h2>New message received</h2>
      <p><strong>From:</strong> ${message.name} (${message.email})</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.message}</p>
    `;
        await (0, exports.sendEmail)({
            to: process.env.SMTP_USER,
            subject,
            text,
            html,
        });
        console.log('New message notification sent successfully');
    }
    catch (error) {
        console.error('Error sending new message notification:', error);
        throw error;
    }
};
exports.sendNewMessageNotification = sendNewMessageNotification;
const sendReplyNotification = async (message, reply) => {
    try {
        console.log('Sending reply notification...');
        const subject = `Re: ${message.subject}`;
        const text = `
      Your message has been replied to:
      
      Original Message:
      From: ${message.name} (${message.email})
      Subject: ${message.subject}
      Message: ${message.message}
      
      Reply:
      ${reply}
    `;
        const html = `
      <h2>Your message has been replied to</h2>
      <h3>Original Message:</h3>
      <p><strong>From:</strong> ${message.name} (${message.email})</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.message}</p>
      
      <h3>Reply:</h3>
      <p>${reply}</p>
    `;
        await (0, exports.sendEmail)({
            to: message.email,
            subject,
            text,
            html,
        });
        console.log('Reply notification sent successfully');
    }
    catch (error) {
        console.error('Error sending reply notification:', error);
        throw error;
    }
};
exports.sendReplyNotification = sendReplyNotification;
