import { Router } from "express";
import * as C from "../controllers/movieController.js";


const movieRouter = Router()

movieRouter.post("/movies", C.postMovie)
movieRouter.get("/movies", C.getAllMovies)
movieRouter.get("/movies/:id", C.listMovieById)
movieRouter.post("/movies/:id", C.watchedStatus)
movieRouter.delete("/movies/:id", C.deleteMovie)
movieRouter.get("/ranking", C.getPlatformRanking)

export default movieRouter