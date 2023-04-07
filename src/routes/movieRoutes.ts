import { Router } from "express";
import { getAllMovies, postMovie } from "../controllers/movieController.js";


const movieRouter = Router()

movieRouter.post("/movies", postMovie)
movieRouter.get("/movies", getAllMovies)

export default movieRouter