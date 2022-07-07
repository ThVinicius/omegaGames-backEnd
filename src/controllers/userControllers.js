import { db, objectId } from '../db/mongo.js'

export async function getHome(_, res) {
  try {
    const games = await db.collection('games').find().toArray()

    return res.status(200).send(games)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export async function postGame(req, res) {
  const { userId } = res.locals.session
  const { name, url, price, _id } = req.body

  try {
    const teste = await db
      .collection('users')
      .updateOne(
        { _id: userId },
        { $push: { cart: { name, url, price, _id } } }
      )

    console.log(teste)

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send(error)
  }
}
