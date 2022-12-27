import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany({})
    res.status(200).json(posts)
  }
}
