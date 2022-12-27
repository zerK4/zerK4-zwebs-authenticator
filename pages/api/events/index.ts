import { NextApiRequest, NextApiResponse } from "next";
import authenticator from "../../../utils/authenticator";

export default authenticator(function eventsHandler(req: NextApiRequest, res:NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
});
