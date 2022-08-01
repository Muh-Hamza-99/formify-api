// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD,
//         },
//     });
//     const mailOptions = {
//         from: "Formify",
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//     };
//     await transporter.sendMail(mailOptions);
// };

const SendGrid = require("@sendgrid/mail");
SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
    const email = {
        to: options.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: options.subject,
        html: options.body,
    };  
    return SendGrid.send(email);
};

module.exports = sendEmail;