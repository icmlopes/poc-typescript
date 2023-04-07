import { NextFunction, Request, Response } from "express";
import { NewMovie } from "../protocols/movieProtocol.js";
import { movieSchema } from "../schemas/movieSchema.js";
import { getMovieById, getMoviesList, insertMovie, updateStatus } from "../repositories/movieRepository.js";
import { notFoundError } from "../errors/index.js";


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

export async function listMovieById(req: Request, res: Response, next:NextFunction){

    const id = Number(req.params.id)

    try{

        const getById = await getMovieById(id)

        return res.status(200).send(getById.rows)

    } catch(err){
        console.log(err)
        next(err)
    }
}

export async function watchedStatus(req: Request, res: Response, next: NextFunction){

    const id = Number(req.params.id)
    const getComment = req.body 

    try{

        const getById = await getMovieById(id)

        if(getById.rowCount === 0){
            throw notFoundError()
        }

        await updateStatus(getComment, id) 

        return res.sendStatus(200)

    } catch(err){
        console.log(err)
        next(err)
    }
}