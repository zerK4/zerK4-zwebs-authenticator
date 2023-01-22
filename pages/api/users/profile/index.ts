/**
 * ? Profile creation function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */
import handler from "../../../../utils/handler";
import prisma from "../../../../utils/prismaClient";

/**
 * ! Post method handles the creation of the profile.
 */

export default handler.post(async (req, res) => {
    let currentUser: any;
    let newProfile: any;
    let userProfile: any;

    try {
        currentUser = await prisma.user.findFirst({
            where: {
                confirmationToken: req.body.token
            },
            include: {
                profile: true
            }
        })
        newProfile = await prisma.profile.create({
            data: {
                userId: currentUser!.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                jobPosition: req.body.jobTitle,
                phoneNumber: req.body.phone,
                avatar: "/userAvatar/defaultAvatar.svg"
            }
        })
    } catch (err) {
        console.log(err);
    } finally {
        userProfile = await prisma.user.findFirst({
            where: {
                confirmationToken: req.body.token
            },
            include: {
                profile: true,
            }
        })
    }
    res.status(200).json({ newProfile: userProfile })
})
    /**
     * ! GET method handles checking if the user does not have already a profile.
     */
    .get(async (req, res) => {
        const userProfile = await prisma.user.findFirst({
            where: {
                confirmationToken: req.body.token
            },
            include: {
                profile: true
            }
        })
        if (userProfile?.profile) {
            res.status(401).json({ message: "You already have a profile!" })
        } else {
            res.status(200).json({ message: "You have to create a profile!" })
        }
    })
