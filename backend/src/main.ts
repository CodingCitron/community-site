import express  from "express"
import morgan from "morgan"
import { AppDataSource } from "./data-source"
import authRoutes from './routes/auth'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
const origin = "http://localhost:3000"

app.use(cors({
    origin,
    credentials: true
}))
app.use(express.json())
app.use(morgan("dev"))

dotenv.config()

app.use("/api/auth", authRoutes)

app.get("/", (_, res) => res.send("running"))
// listen 어플을 실행
app.listen(process.env.PORT, async () => {
    console.log(`running`)

    AppDataSource.initialize().then(async () => {

        console.log("Inserting a new user into the database...")
    
    }).catch(error => console.log(error))
})
