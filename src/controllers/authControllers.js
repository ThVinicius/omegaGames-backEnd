import bcrypt from 'bcrypt'
import { db } from '../db/mongo.js'

export const register = async (req, res) => {
  try {
    const { name, email, picture, password } = req.body

    const cryptPassword = bcrypt.hashSync(password, 10)

    const toSend = {
      name,
      email,
      picture,
      password: cryptPassword,
      cart: [],
      purchases: []
    }

    await db.collection('users').insertOne(toSend)

    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
