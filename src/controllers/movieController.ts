import { NextFunction, Request, Response } from "express";
import { NewMovie } from "../protocols/movieProtocol.js";
import { movieSchema } from "../schemas/movieSchema.js";
import * as R from "../repositories/movieRepository.js";
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

        await R.insertMovie(movie)

    } catch(err){
        next(err)
    }
    res.status(200).send("Filme criado com sucesso! =D")
}

export async function getAllMovies(req: Request, res: Response, next: NextFunction){

    try{

        const moviesList = await R.getMoviesList()
        
        return res.status(200).send(moviesList.rows)

    } catch(err){
        next(err)
    }

}

export async function listMovieById(req: Request, res: Response, next:NextFunction){

    const id = Number(req.params.id)

    try{

        const getById = await R.getMovieById(id)

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

        const getById = await R.getMovieById(id)

        if(getById.rowCount === 0){
            throw notFoundError()
        }

        await R.updateStatus(getComment, id) 

        return res.sendStatus(200)

    } catch(err){
        console.log(err)
        next(err)
    }
}

export async function deleteMovie (req: Request, res: Response, next:NextFunction) {

    const id = Number (req.params.id)

    try{

        const getById = await R.getMovieById(id)

        if(getById.rowCount === 0){
            throw notFoundError()
        }

        await R.deleteMovieById(id)

        return res.status(500).send("Filme deletado com sucesso!!")

    } catch(err){
        next(err)
    }

}

export async function getPlatformRanking(req: Request, res: Response, next: NextFunction){

    try{

        const ranking = await R.platformsCount()

        if(ranking.rowCount === 0){
            throw notFoundError()
        }

        return res.status(200).send(ranking.rows)

    } catch(err){
        next(err)
    }
}