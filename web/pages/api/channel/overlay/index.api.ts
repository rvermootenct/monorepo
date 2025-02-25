import type { NextApiRequest, NextApiResponse } from "next"
import { createHandler } from "@Utils/middlewares/createHandler"
import { userAuth } from "@Utils/middlewares/auth"
import mongoose from "mongoose"
import { Channel } from "@Services/mongodb/models"
import { sanitize } from "@Services/mongodb/utils/sanitize"
import { getRawChannelProfileByIdQuery } from "@Services/mongodb"

const handler = createHandler(userAuth)

// Get overlay data for a user
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { _id } = req.query

	const profile = await getRawChannelProfileByIdQuery(_id as string)

	return res.status(200).json(profile)
})

// Remove a channel from existence...Or just the database
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { channelId, key, change } = req.body

	try {
		const result = await Channel.findOneAndUpdate(
			{ _id: new mongoose.Types.ObjectId(sanitize(channelId)) },
			{
				$set: {
					[`overlay.${key}`]: change
				}
			}
		)

		if (result) {
			return res.status(200).json(result)
		}
	} catch (error) {
		return res.status(500).json({ error })
	}
})

export default handler
