import { Router } from "express"
import movieRouter from "../routes/movieRoutes.js"


const routes = Router()

routes.use("/", movieRouter)

export default routes