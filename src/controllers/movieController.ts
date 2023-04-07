import { MovieEntity } from './../protocols/movieProtocol.js';
import { NextFunction, Request, Response } from "express";
import { NewMovie } from "../protocols/movieProtocol.js";
import { movieSchema } from "../schemas/movieSchema.js";
import { getMoviesList, insertMovie } from "../repositories/movieRepository.js";


export async function postMovie(req: Request, res: Response, next: NextFunction) {
    
    const movie = req.body as NewMovie

    const {error} = movieSchema.validate(movie)

    if(error){

        return res.status(400).send({
            
            message: error.message
        })
    }

    try{

        await insertMovie(movie)

    } catch(err){
        next(err)
    }
    res.status(200).send("Filme criado com sucesso! =D")
}

export async function getAllMovies(req: Request, res: Response, next: NextFunction){

    try{

        const moviesList = await getMoviesList()
        
        return res.status(200).send(moviesList.rows)

    } catch(err){
        next(err)
    }

}