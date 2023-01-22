/**
 * ? Verification function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import handler from "../../../utils/handler";
import prisma from "../../../utils/prismaClient";

export default handler.post(async (req, res) => {

  let updatedUser: any;
  let alreadyVerified: any;

  const currentUser = await prisma.user.findFirst({
    where: {
      confirmationToken: req.body.token
    },
    include: {
      profile: true
    }
  })

  if (currentUser?.confirmed) {
    alreadyVerified = currentUser.confirmed
  }
  if (!alreadyVerified) {
    updatedUser = await prisma.user.update({
      where: {
        confirmationToken: req.body.token,
      },
      data: {
        confirmed: true,
      },
    })
    res.status(200).json({ updatedUser: updatedUser })
  } else {
    res.status(401).json({ alreadyVerified: true })
  }
})
