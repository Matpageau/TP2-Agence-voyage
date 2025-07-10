import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import MainRouter from "./routes/MainRouter"
import errorHandler from "./middleware/errorHandler"

const app = express()
const port = 3000

app.use(express.json())

const uri = "mongodb+srv://dev:dev@cluster0.ylc53cj.mongodb.net/voyage?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(uri)
    .then(() => console.log("Connected to database"))
    .catch((err) => {
      console.error("Database connection error:", err)
})

app.use("/", MainRouter)
app.use(errorHandler)

app.listen(port)