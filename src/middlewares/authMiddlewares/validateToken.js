import jwt from "jsonwebtoken";

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    console.log(dados);
    res.locals.dados = dados;
  } catch {
      res.sendStatus(400);
  }

  next();
}

export default validateToken;
