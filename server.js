import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import colors from "colors"
import connectDB from "./config/dbConnect.js"
import UserRouter from "./routes/user.routes.js"
import globalErrorHandler from "./utils/globalErrorHandler.js"

/** env Values */
dotenv.config()
const mode = process.env.MODE
const port = process.env.PORT || 4000

const app = express()

/** Db Connection */
connectDB()
.then((success) => {
  console.log(`Mongodb connected successfully: ${success}`.bgGreen.white)
  app.listen(port, ()=>{
    console.log(`Server is Running in ${mode} environment at: ${port}`)
  })
})
.catch((error) => {
  console.log(`MongoDb failed to connect: ${error}`)
});

/** Initialization */
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

/** Root Level Routing */
app.use("/api/user", UserRouter)

/** Sample Response */
app.get("/",  (req, res) => {
  return res.send("<h1> RCSRM Architecture Workflow.")
})

/** Global Error Handler */
app.use(globalErrorHandler)