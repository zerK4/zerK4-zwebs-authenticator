/**
 * ? Next api middleware.
 * * Helps for http moethods simplification.
 */
import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"

const handler = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({error: `Something happened! ${error}`})
    },
    onNoMatch(req, res) {
        res.status(501).json({error: `Something happened! ${req.method}`})
    }
})

export default handler