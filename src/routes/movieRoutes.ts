import { Router } from "express";
import { postMovie } from "../controllers/movieController.js";


const movieRouter = Router()

movieRouter.post("/movies", postMovie)

export default movieRouter