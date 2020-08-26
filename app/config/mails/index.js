require('dotenv').config()
const nodemailer = require("nodemailer")


module.exports = async (to, subject, html) => {

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.STMP_SECURE,
        auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASSWORD
        }
    })

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: to,
        subject: subject,
        html: html
    })

}