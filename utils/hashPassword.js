import { randomBytes, createHmac } from "node:crypto"


export const hashPassword = (password, key) => {
  const salt = key ?? randomBytes(16).toString("hex");
  const hashedPassword = createHmac('sha256', salt).update(password).digest("hex");
  return { hashedPassword, salt }
}