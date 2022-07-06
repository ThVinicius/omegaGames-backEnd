import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)
let db
mongoClient.connect(() => {
  db = mongoClient.db('omegaGames')
})

const objectId = ObjectId

export { db, objectId }
