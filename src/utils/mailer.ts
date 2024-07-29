import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables from .env file
dotenv.config({ path: '/Users/salarsmac/nodejs/myNewExpressApp/.env' });


// Create a reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT), // Convert port to number
    secure: false, // Set to true if using a secure connection (TLS/SSL)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

// Define a function to send an email
export const sendEmail = async (emailAddresses:any, subject: any, text: any, html: any) => {
    let mailOptions = {
        from: process.env.SMTP_SENDER,
        to: emailAddresses,
        subject: subject,
        text: text,
        html: html
    };

    // Send mail with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
