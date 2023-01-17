/**
 * ? User handling function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */
import prisma from "../../../utils/prismaClient";
import authenticator from "../../../utils/authenticator";
import handler from "../../../utils/handler";
import { UserType } from "../../../utils/interfaces/ClientInterface";


export default authenticator(handler.get(async (req, res) => {
  const comUsers: UserType[] = await prisma.user.findMany({
    include: {
      profile: true,
      technology: true,
    }
  })
  const data = comUsers.map(user => user.token ? { ...user, token: "" } : null)
  res.status(200).json({ data: data })
}))