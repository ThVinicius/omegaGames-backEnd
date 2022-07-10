import jwt from "jsonwebtoken";

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    res.locals.data = data;
  } catch {
      res.sendStatus(400);
  }

  next();
}

export default validateToken;
