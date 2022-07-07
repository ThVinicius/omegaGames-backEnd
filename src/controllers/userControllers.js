import { db } from '../db/mongo.js'

export async function getHome(_, res) {
  try {
    const games = await db.collection('games').find().toArray()

    return res.status(200).send(games)
  } catch (error) {
    return res.status(500).send(error)
  }
}
