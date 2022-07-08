import { db, objectId } from '../db/mongo.js';

export async function getHome(_, res) {
  try {
    const games = await db.collection('games').find().toArray();

    return res.status(200).send(games);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function postGame(req, res) {
  const { userId } = res.locals.session;
  const { name, url, price, _id } = req.body;

  try {
    await db
      .collection('users')
      .updateOne(
        { _id: userId },
        { $push: { cart: { name, url, price, _id } } }
      );

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getUser(_, res) {
  const { userId: _id } = res.locals.session;

  try {
    const user = await db.collection('users').findOne({ _id });

    delete user.password;

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}
