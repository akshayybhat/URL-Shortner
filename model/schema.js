import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";



export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text(),
  salt: text()
});

export const urlTable = pgTable('url', {
  id: uuid().primaryKey().defaultRandom(),
  shortCode: varchar({ length: 50 }).notNull().unique(),
  targetURL: varchar({ length: 2000 }).notNull(),
  userid: uuid().references(() => usersTable.id).notNull()
})