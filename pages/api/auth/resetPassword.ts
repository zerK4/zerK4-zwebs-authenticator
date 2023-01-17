/**
 * ? Password reset function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import { hash } from 'bcrypt';
import { verifyEmail } from '../../../utils/email'
import handler from "../../../utils/handler";
import prisma from "../../../utils/prismaClient";
/**
 * ? The post method handles the send email part from the reset password function.
 */
export default handler.post(async (req, res) => {

  const currentUser = await prisma.user.findFirst({
    where: {
      email: req.body.email
    },
  })
  const document = {
    userEmail: currentUser?.email,
    userName: currentUser?.username,
    token: currentUser?.confirmationToken,
    subject: "Reset password || zWebs",
    message: "Hey, follow this link if you want to change your password!",
    link: `${process.env.URL}/users/reset/password/${currentUser?.confirmationToken}`,
    button: "Go!"
  }

  if (currentUser) {
    verifyEmail(document)
    res.status(200).json({
      message: "Email successfully sent!"
    })
  } else {
    res.status(401).json({ message: "You do not have an account!" })
  }

})
  /**
   * ? The put method helps to change the password once the data is sent from the frontend.
   */
  .put(async (req, res) => {
    console.log(req.body);
    if (req.body.password !== "") {
      hash(req.body.password, 12, async (err, hash) => {
        if (err) {
          console.log("Got an error on password");
        } else {
          const user = await prisma.user.update({
            where: {
              confirmationToken: req.body.token,
            },
            data: {
              token: hash,
            },
          });
          res.status(200).json({
            message: "Password changed successfuly.",
          });
        }
      });
    }
  })
