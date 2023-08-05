import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoute from "./routes/authRoutes.js"
import taskRoute from "./routes/taskRoutes.js"
import dotenv from "dotenv";
dotenv.config({path:"./config/.env"})


export const app = express();



const corsOption = {
    origin: process.env.FRONTEND_URI,
    credentials : true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}

app.use(express.json()) //for all .json data
app.use(cookieParser()) //for request cookie from frontend
app.use(cors(corsOption)) //for sending data from one domain to another domain
app.use("/api/v1/user", authRoute)
app.use("/api/v1/task", taskRoute)