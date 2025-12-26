import express from "express";
import { authenticate } from "../middleware/authentication.js"
import { shortenSchema } from "../validations/zod.schema.js"
import { db } from "../db/index.js"
import { urlTable } from "../model/schema.js"
import { nanoid } from "nanoid"
import { and, eq } from "drizzle-orm"
export const router = express.Router()


router.post("/shorten", authenticate, async (req, res) => {
  // zod validations

  const validation = await shortenSchema().safeParseAsync(req.body);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.format() })
  }

  // create shortcode
  let shortCode;
  if (!validation.data.shortCode) {
    shortCode = nanoid(6);
  } else {
    shortCode = validation.data.shortCode
  }

  const [shortenUrl] = await db.insert(urlTable).values({
    targetURL: validation.data.targetURL,
    shortCode,
    userid: req.user.id
  }).returning({
    targetURL: urlTable.targetURL,
    shortCode: urlTable.shortCode
  })

  if (shortenUrl) {
    res.status(201).json({ success: "code shortened", target: shortenUrl.targetURL, shortcode: shortenUrl.shortCode })
  } else {
    res.status(500).json({ error: "shorten code dint create" })
  }
})

// make it authenticated route when frontend is built
router.get("/:shortenCode", async (req, res) => {
  const shortCode = req.params.shortenCode

  const [shortCodeExist] = await db.select({
    targetURL: urlTable.targetURL,
    shortCode: urlTable.shortCode
  }).from(urlTable).where(eq(urlTable.shortCode, shortCode))



  if (!shortCodeExist) {

    return res.status(404).json({ error: "Invalid short code" })
  }
  res.status(307).redirect(shortCodeExist.targetURL)

})

// get all codes of a user
router.get("/codes", authenticate, async (req, res) => {
  const [result] = await db.select({
    shortCode: urlTable.shortCode
  }).from(urlTable).where(eq(urlTable.id, req.user.id));

  if (!result) {
    return res.status(404).json({ error: "could not find any codes" })
  }

  return res.status(200).json({ success: result.shortCode })

})

//delete codes for a user

router.delete("/:shortenCode", authenticate, async (req, res) => {
  const shortCode = req.params.shortenCode

  const result = await db.delete(urlTable).where(and(eq(urlTable.shortCode, shortCode), eq(urlTable.userid, req.user.id)))

  if (!result) {
    return res.status(500).json({ error: "could not be deleted" })
  }

  return res.status(200).json({ success: "short code deleted" })

})

// update targetURL for shorten code

router.patch("/update", authenticate, async (req, res) => {
  // zod validation
  const validation = await shortenSchema().safeParseAsync(req.body);
  if (validation.error) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const result = await db.update(urlTable).set({ targetURL: validation.data.targetURL }).where(and(eq(urlTable.shortCode, validation.data.shortCode), eq(urlTable.userid, req.user.id)))

  if (!result) {
    return res.status(500).json({ error: "could not update" })
  }

  return res.status(200).json({ success: "URL updated" })
})