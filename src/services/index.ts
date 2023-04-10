import { notFoundError } from "../errors/index.js";
import { NewMovie } from "../protocols/movieProtocol.js";
import * as R from "../repositories/movieRepository.js";


export async function createNewMovie(movie: NewMovie){
    await R.insertMovie(movie)
}

export async function showAllMovies(){
    
    const {rows} = await R.getMoviesList()

    return rows

}

export async function showById(id: number){

    const {rows} = await R.getMovieById(id)

    return rows
}

export async function changeStatus(comment: string, id: number){

    const getById = await showById(id)

    if(getById.length === 0){
        throw notFoundError()
    }

    await R.updateStatus(comment, id)

    return getById

}

export async function removeMovie(id: number){

    const getById = await showById(id)

    if(getById.length === 0){
        throw notFoundError()
    }

    await R.deleteMovieById(id)

    return getById
}

export async function countPlatform(){

    const ranking = await R.platformsCount()

    if(ranking.rowCount === 0){
        throw notFoundError()
    }

    return ranking.rows

}