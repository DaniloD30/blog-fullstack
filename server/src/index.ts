import express, {Express, Request, Response} from "express"
import rootRouter from "./routes"

const app: Express = express()

app.use('/api', rootRouter)

app.listen(3000, () => {console.log('App working!')})