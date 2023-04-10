import { NextFunction, Request, Response } from "express";
import { NewMovie } from "../protocols/movieProtocol.js";
import { movieSchema } from "../schemas/movieSchema.js";
import * as R from "../repositories/movieRepository.js";
import { notFoundError } from "../errors/index.js";
import * as S from "../services/index.js";


export async function postMovie(req: Request, res: Response, next: NextFunction) {
    
    const movie = req.body as NewMovie

    const {error} = movieSchema.validate(movie)

    if(error){

        return res.status(400).send({
            
            message: error.message
        })
    }

    try{

        await S.createNewMovie(movie)

    } catch(err){
        next(err)
    }
    res.status(200).send("Filme criado com sucesso! =D")
}

export async function getAllMovies(req: Request, res: Response, next: NextFunction){

    try{

        const moviesList = await S.showAllMovies()
        
        return res.status(200).send(moviesList)

    } catch(err){
        next(err)
    }

}

export async function listMovieById(req: Request, res: Response, next:NextFunction){

    const id = Number(req.params.id)

    try{

        const getById = await S.showById(id)

        return res.status(200).send(getById)

    } catch(err){
        console.log(err)
        next(err)
    }
}

export async function watchedStatus(req: Request, res: Response, next: NextFunction){

    const id = Number(req.params.id)
    const {comment} = req.body 

    try{

        await S.changeStatus(comment, id)
  
        return res.sendStatus(200)

    } catch(err){
        console.log(err)
        next(err)
    }
}

export async function deleteMovie (req: Request, res: Response, next:NextFunction) {

    const id = Number (req.params.id)

    try{

        await S.removeMovie(id)

        return res.status(500).send("Filme deletado com sucesso!!")

    } catch(err){
        next(err)
    }

}

export async function getPlatformRanking(req: Request, res: Response, next: NextFunction){

    try{

        const ranking = await S.countPlatform()

        return res.status(200).send(ranking)

    } catch(err){
        next(err)
    }
}