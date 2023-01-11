/**
 * ? Logout function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(req: NextApiRequest, res:NextApiResponse){
  res.setHeader("Set-Cookie", [`auth=deleted; Max-Age=0; path=/`]);
  res.status(200).json({ message: "Logged out" });
}
