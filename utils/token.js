import jwt from "jsonwebtoken"


export const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token
}

export const validateToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user
  } catch (error) {
    throw new Error(error)
  }
}