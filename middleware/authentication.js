import { validateToken } from "../utils/token.js"

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).json({ error: "token not included" })
  }

  const user = validateToken(token.split(" ")[1]);

  if (user) {
    req.user = user
    next()
  }

}