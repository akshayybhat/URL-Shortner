import { validateToken } from "../utils/token.js"

export const authenticate = (req, res, next) => {
  const token = req.header.authorization

  if (!token) {
    return res.status(403).json({ error: "token not included" })
  }

  const user = validateToken(token);
  if (user) {
    req.body.user = user
    next()
  }

}