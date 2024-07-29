import dotenv from 'dotenv';
dotenv.config({path: '/Users/salarsmac/nodejs/myNewExpressApp/.env'});
console.log(process.env.SMTP_HOST)
import nodemailer from 'nodemailer';

// Create a reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    // host: `${process.env.SMTP_HOST}`,
    // port: `${process.env.SMTP_PORT}`,
    // secure: false,
    // auth: {
    //     user: `${process.env.SMTP_USER}`, 
    //     pass: `${process.env.SMTP_PASSWORD}`
    // }
});

export const sendEmail = async (emailAddresses: any, subject: any, text: string, html: any) => {
    let mailOptions = {
        from: `${process.env.SMTP_SENDER}`,
        to: emailAddresses, 
        subject: subject, 
        text: text,
        html: html 
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions);
};
