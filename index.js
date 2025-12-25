import express from "express"
import 'dotenv/config'
import { router as userRouter } from "./routes/userRouter.router.js"
import { router as urlRouter } from "./routes/urlRouter.router.js"
const app = express()
const port = process.env.PORT

app.use(express.json());

app.use("/user", userRouter);
app.use("/", urlRouter);


app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`)
})