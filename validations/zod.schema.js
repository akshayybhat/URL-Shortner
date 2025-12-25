import { z } from "zod"


export const signUpSchema = () => {
  return z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.email(),
    password: z.string().min(5)
  });
}

export const loginSchema = () => {
  return z.object({
    email: z.email(),
    password: z.string().min(5)
  });
}