/**
 * ? Email server.
 * ? Handles sending emails for the application.
 */
import nodemailer from 'nodemailer'

const email = process.env.EMAIL
const password = process.env.PW

let sender = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: email,
        pass: password
    }
})

export const verifyEmail = async ({userEmail, userName, token, subject, message, link, button}: any) => {
    try {
        let info = await sender.sendMail({
            from: email,
            to: userEmail,
            subject: subject,
            html: `<body>
            <div style="
      background: #171717; padding: 10px; border-radius: 6px; color: black; border: 2px solid black;
        box-shadow: 0 20px 20px 0 black;">
        <h1 style="font-size: 20px; color: white;">
            Hello there ${userName}, press on that yellow button if you made the request!
        </h1>
        <br />
        <p style="color: gray;">
            ${message}
        </p>
        <div style="display:flex; justify-content: center; margin:20px; align-items: center; "></div>
        <a id="customLink" href=${link}>
            <button style=" background: yellow; padding: 10px; border-radius: 6px; cursor: pointer ">
                ${button} 🎉
            </button>
        </a>
    </div>
    </div>
        </body>`,
        })
    } catch (err) {
        console.log(err)
    }
}
