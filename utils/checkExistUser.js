import { db } from "../db/index.js"
import { usersTable } from "../model/schema.js"
import { eq } from "drizzle-orm"

export const checkUserExist = async (email) => {
  const [userExist] = await db.select().from(usersTable).where(eq(usersTable.email, email))
  return userExist
}