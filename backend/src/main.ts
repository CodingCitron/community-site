import express  from "express"
import morgan from "morgan"
import { AppDataSource } from "./data-source"

const app = express()
let port = 4000

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (_, res) => res.send("running"))
// listen 어플을 실행
app.listen(port, async () => {
    console.log(`running`)

    AppDataSource.initialize().then(async () => {

        console.log("Inserting a new user into the database...")
    
    }).catch(error => console.log(error))
})
