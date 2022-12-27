import prisma from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import authenticator from "../../../utils/authenticator";

export default authenticator(async function handler(req: NextApiRequest, res:NextApiResponse) {
  
  if (req.method === "GET") {
    const comUsers = await prisma.user.findMany({
      include: {
        posts: true,
      }
    })
    const users = comUsers.map(user => user.token ? {...user, token: ""} : null)
    res.status(200).json(users)

  }
})
