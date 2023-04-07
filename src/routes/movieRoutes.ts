import { Router } from "express";
import { getAllMovies, listMovieById, postMovie, watchedStatus } from "../controllers/movieController.js";


const movieRouter = Router()

movieRouter.post("/movies", postMovie)
movieRouter.get("/movies", getAllMovies)
movieRouter.get("/movies/:id", listMovieById)
movieRouter.post("/movies/:id", watchedStatus)

export default movieRouter