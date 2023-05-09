import express  from "express"
import morgan from "morgan"
import { AppDataSource } from "./data-source"
import authRoutes from './routes/auth'
import subRoutes from './routes/subs'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"

const app = express()
const origin = "http://localhost:3000"

app.use(cors({
    origin,
    credentials: true
}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

dotenv.config()

app.use("/api/auth", authRoutes)
app.use("/api/subs", subRoutes)

app.get("/", (_, res) => res.send("running"))
// listen 어플을 실행
app.listen(process.env.PORT, async () => {
    console.log(`running`)

    AppDataSource.initialize().then(async () => {

        console.log("Inserting a new user into the database...")
    
    }).catch(error => console.log(error))
})
