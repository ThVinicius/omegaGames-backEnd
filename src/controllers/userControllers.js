import { db, objectId } from "../db/mongo.js";

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

  //userRating está em um array de objetos chamado purchases (verifica pelo id do jogo) (mudar a avaliação)

  //rating (array) está em uma collection de objetos (dentro do array verifica pelo idUser, caso já tenha uma  nota lá, apenas atualize, caso contrario adiciona) (atualizar ou adicionar {idDoUser, avaliação})

  // await db.collection('session').findOneAndUpdate(
  //   { idUser: user._id },
  //   { $set: { idUser: user._id, token } },
  //   {
  //     upsert: true
  //   }
  // )

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
