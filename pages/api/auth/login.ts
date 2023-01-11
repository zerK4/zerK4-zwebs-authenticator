/**
 * ? Login function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import prisma from "../../../utils/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    const document = req.body;
    /**
     * Search the account by email in DB.
     */
    if (req.body) {
      const user = await prisma.user.findFirst({
        where: {
          email: document.email,
        },
        include: {
          profile: true,
        }
      });
      /**
       * Once found the password is compared with the hash.
       * The token is created with JWT and pushed to cookies in order to assure authentication over the website.
       */
      if (user) {
        compare(document.password, user.token, (err, result) => {
          if (!err && result) {
            const claims = {
              sub: user.id,
              email: user.email,
              username: user.username,
            };
            const tokJWT = sign(claims, process.env.JWT!, { expiresIn: "7d" });
            res.setHeader(
              "Set-Cookie",
              cookie.serialize("auth", tokJWT, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
              })
            );
              if(user.confirmed) {
                if(user.profile) {
                  res.status(200).json({ person: {
                    firstName: user.profile!.firstName,
                    lastName: user.profile!.lastName,
                    email: user.email,
                    validated: true
                  }, status: 200 });
                } else {
                  res.status(401).json({message: "Please create a profile!", need: "profile", token: user.confirmationToken})
                }
              } else {
                res.status(401).json({ person: {
                  validated: false,
                }, status: 401 });
              }
          } else {
            console.log("hitting here");
            
            res
              .status(404)
              .json({ message: "Please check your credentials!", status: 404 });
          }
        });
      } else {
        res.status(404).json({ message: "Account not found", status: 404 });
      }
    }
  }
}
