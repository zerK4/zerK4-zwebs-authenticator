import prisma from "../../../utils/prismaClient";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const document = await req.body;
    console.log(req.body, "here");
    /**
     * Check if email already exists
     */
    const existsEmail = await prisma.user.findFirst({
      where: {
        email: document.email,
      },
    });
    /**
     * Check if username already exists
     */
    const existsUsername = await prisma.user.findFirst({
      where: {
        username: document.username,
      },
    });
    /**
     * If email or username exists send data.
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
       * Once everything is received the account is created
       * */
      if (req.body.password !== "" || req.body.eventCode !== "") {
        hash(document.password, 12, async (err, hash) => {
          if (err) {
            console.log("Got an error on password");
          } else {
            const user = await prisma.user.create({
              data: {
                firstName: document.firstName,
                lastName: document.lastName,
                username: document.username,
                email: document.email,
                avatar: "",
                token: hash,
              },
            });
            res.status(200).json({
              Message: "Account created successfully",
              name: document.username,
            });
          }
        });
      } else {
        res.status(200).json({ message: "Nothing to create", status: 403 });
      }
    }
  }
}
