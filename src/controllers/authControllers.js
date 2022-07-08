import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db, objectId } from "../db/mongo.js";
import loginSchema from "../schemas/authShemas/loginSchema.js";

export async function signIn(req, res) {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    return res.sendStatus(422);
  }

  try {
    const user = await db.collection("users").findOne({ email: email });

    if (!user) {
      return res.sendStatus(404);
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (user && comparePassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      const sessionUser = await db
        .collection("sessions")
        .findOne({ userId: user._id });

      if (sessionUser) {
        try {
          await db
            .collection("sessions")
            .updateOne({ userId: user._id }, { $set: { token: token } });
          return res.sendStatus(200);
        } catch (error) {
          console.log(error);
          res.sendStatus(404);
        }
      }

      await db.collection("sessions").insertOne({
        userId: objectId(user._id),
        token,
      });

      return res.status(201).send({ token });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}
export async function register(req, res) {
  try {
    const { name, email, picture, password } = req.body;

    const cryptPassword = bcrypt.hashSync(password, 10);

    const toSend = {
      name,
      email,
      picture,
      password: cryptPassword,
      cart: [{ id: objectId, name, url, price }],
      purchases: [],
    };

    await db.collection("users").insertOne(toSend);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
