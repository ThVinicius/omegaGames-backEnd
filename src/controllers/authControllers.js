
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db,objectId } from "../db/mongo";
import loginSchema from "../schemas/authSchemas/loginSchema";

export async function signIn(req, res) {
  const { email, password } = req.body;

  const { error } = loginSchema.validate(user);

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
      const token = jwt.sign(
        { id: objectId(user._id) },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const sessionUser = await db.collection("sessions").findOne({ id: objectId(_id)});

      if(sessionUser.id){
          //atualiza user
      }

      await db.collection("sessions").insertOne({
        userId: objectId(user._id),
        token
      });

      return res.status(201).send({ token });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export function register (req, res) {
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