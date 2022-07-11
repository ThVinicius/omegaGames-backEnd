import { db, objectId } from "../db/mongo.js";
import dayjs from "dayjs";

export async function getHome(_, res) {
  try {
    const games = await db.collection("games").find().toArray();

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
      .collection("users")
      .updateOne(
        { _id: userId },
        { $push: { cart: { name, url, price, _id } } }
      );

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function removeGame(req, res) {
  const { userId } = res.locals.session;
  const { id: _id } = req.params;

  try {
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $pull: { cart: { _id } } });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getUser(_, res) {
  const { userId: _id } = res.locals.session;

  try {
    const user = await db.collection("users").findOne({ _id });

    delete user.password;

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function changeRating(req, res) {
  const { userId } = res.locals.session;
  const { initialValue, newValue } = req.body;
  const _id = objectId(req.params.id);

  try {
    const changeValue = { "purchases.$.userRating": newValue };

    await db
      .collection("users")
      .updateOne({ _id: userId, "purchases._id": _id }, { $set: changeValue });

    let newDocument;

    if (initialValue === 0) {
      const aux = { userId, value: newValue };

      newDocument = await db
        .collection("games")
        .findOneAndUpdate(
          { _id },
          { $push: { rating: aux } },
          { returnDocument: "after" }
        );
    } else {
      const changeValue = { "rating.$.value": newValue };

      newDocument = await db
        .collection("games")
        .findOneAndUpdate(
          { _id, "rating.userId": userId },
          { $set: changeValue },
          { returnDocument: "after" }
        );
    }

    return res.status(200).send(newDocument.value);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function purchase(req, res) {
  const { userId } = res.locals.session;
  const toAdd = [];
  const now = dayjs().format("DD/MM/YYYY");

  for (const game of req.body) {
    const { _id } = game;
    toAdd.push({ ...game, _id: objectId(_id), date: now });
  }

  try {
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $push: { purchases: { $each: toAdd } } });

    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { cart: [] } });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
