import nodemailer from "nodemailer";

export const mailSender = async (email, subject, html) => {

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },

    });

    const sendMail = await transport.sendMail({
        to: email,
        from: process.env.SMTP_MAIL,
        subject,
        html
    })

    if(sendMail) return true
    else return false
}

