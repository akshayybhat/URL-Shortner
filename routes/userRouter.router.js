import express from "express";
import { db } from "../db/index.js"
import { usersTable } from "../model/schema.js"
import { checkUserExist } from "../utils/checkExistUser.js"
import { signUpSchema, loginSchema } from "../validations/zod.schema.js"
import { hashPassword } from "../utils/hashPassword.js"
import { createToken } from "../utils/token.js"

export const router = express.Router()

router.post("/signup", async (req, res) => {


  // zod validation
  const validation = await signUpSchema().safeParseAsync(req.body)

  if (validation.error) {
    return res.status(400).json({ error: validation.error.format() })
  }

  // check for existing user

  const userExist = await checkUserExist(validation.data.email);
  if (userExist) {
    return res.status(404).json({ error: "User already exist" })
  }

  // hash password
  const { salt, hashedPassword } = hashPassword(validation.data.password)



  // insert user into table
  const [user] = await db.insert(usersTable).values({
    firstName: validation.data.firstName,
    lastName: validation.data.lastName,
    email: validation.data.email,
    password: hashedPassword,
    salt: salt
  }).returning({
    id: usersTable.id
  })

  if (user) {
    return res.status(201).json({ success: "user created", userid: user.id })
  } else {
    return res.status(500).json({ error: "could not create a new entry" })
  }



})

router.post("/login", async (req, res) => {

  // zod validation
  const validation = await loginSchema().safeParseAsync(req.body)
  if (validation.error) {
    return res.status(400).json({ error: validation.error.format() })
  }

  // check for existing user
  const userExist = await checkUserExist(validation.data.email);
  if (!userExist) {
    return res.status(404).json({ error: "User doesn't exist" })
  }


  // check for passwords

  const { _, hashedPassword } = hashPassword(validation.data.password, userExist.salt)

  let isloggedin = false
  if (hashedPassword == userExist.password) {
    isloggedin = true
  }


  // if logged in create a jwt token and return
  if (isloggedin) {
    const token = createToken({ id: userExist.id, email: userExist.email })
    return res.status(200).json({ success: "logged in", token })
  } else {
    return res.status(403).json({ error: "not authenticated" })
  }



})