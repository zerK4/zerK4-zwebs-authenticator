/**
 * ? Register function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import prisma from "../../../utils/prismaClient";
import { hash } from "bcrypt";
import { verifyEmail } from '../../../utils/email'
import { uuid } from 'uuidv4';
import handler from "../../../utils/handler";

export default handler.post(async (req, res) => {
  const document = await req.body;

  /**
   * ? Check if email already exists
   */
  const existsEmail = await prisma.user.findFirst({
    where: {
      email: document.email,
    },
  });

  /**
   * ? Check if username already exists
   */
  const existsUsername = await prisma.user.findFirst({
    where: {
      username: document.username,
    }, include: {
      profile: true
    }
  });

  /**
   * ? If email or username exists send data.
   */
  if (existsEmail) {
    res
      .status(200)
      .json({ message: "This email is already registered!", status: 403 });
  } else if (existsUsername) {
    res
      .status(200)
      .json({ message: "This username is already registered!", status: 403 });
  } else {
    /**
     * ? Once everything is received the account is created
     * */
    if (req.body.password !== "") {
      const secret = uuid()
      hash(document.password, 12, async (err, hash) => {
        if (err) {
          console.log("Got an error on password");
        } else {
          const user = await prisma.user.create({
            data: {
              username: document.username,
              email: document.email,
              confirmationToken: secret,
              token: hash,
            },
          });
          res.status(200).json({
            Message: "Account created successfully, we have sent you a confirmation email, please go ahead and validate your email so we can be friends.",
            name: document.username,
          });
        }
        /**
         * ? Function handling the verification of the email address.
         */
        const verifier = {
          userEmail: document.email,
          userName: document.username,
          token: secret,
          subject: "Request to confirm email from zWebs",
          message: "Hey, follow this link in order to confirm your email address!",
          link: `${process.env.URL}/verification/${document?.username}/${secret}/`,
          button: "Verify!"
        }
        verifyEmail(verifier)
      });

    } else {
      res.status(200).json({ message: "Nothing to create", status: 403 });
    }
  }
})
  /**
   * ? Handles the request to verify the account from the login page.
   */
  .put(async (req, res) => {
    const currentUser = await prisma.user.findFirst({
      where: {
        email: req.body.email
      }
    })
    const document = {
      userEmail: currentUser?.email,
      userName: currentUser?.username,
      token: currentUser?.confirmationToken,
      subject: "Request to confirm email from zWebs",
      message: "Hey, follow this link in order to confirm your email address!",
      link: `${process.env.URL}/verification/${currentUser?.username}/${currentUser?.confirmationToken}/`,
      button: "Verify!"
    }
    verifyEmail(document)

    res.status(200).json({ message: "Message sent!" })
  })