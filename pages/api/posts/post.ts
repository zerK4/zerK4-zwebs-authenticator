import handler from "../../../utils/handler";
import authenticator from "../../../utils/authenticator";
import multer from "multer";
import prisma from "../../../utils/prismaClient";

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };
  /**
   * handle file upload.
   */
let theFile: any;
let filePath: any;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
        // console.log(file);
        const x = file.originalname.split("").map(x => x == " " ? "-" : x == "(" || x == ")" ? "" : x).join("")
        const fileName = Date.now() + "-" + x
        theFile = fileName;
        filePath = `${process.env.HOST}/images/${fileName}`
        cb(null, fileName)
    }
})
const upload = multer({
    storage: storage
})
const uploadMiddleware = upload.single("image")

/**
 * Uploading file and creating post in DB.
 */

export default authenticator(handler.get(async (req, res) => {
    res.status(200).json("huray")
}).use(uploadMiddleware)
.post(async (req, res) => {
    console.log(theFile, "this is the file");
    console.log(req.body.currentUser);
    const currentUser = req.body.currentUser;
    const user = await prisma.user.findFirst({
        where: {
          email: currentUser,
        },
      });
    const post = await prisma.post.create({
        data: {
            userId: user?.id,
            postTitle: req.body.title,
            postContent: req.body.content,
            postImage: filePath,
        }
      });
    res.status(200).json({message: "Post created!", data: post})
})

)