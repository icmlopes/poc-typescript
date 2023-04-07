import { QueryResult } from "pg";
import { MovieEntity, NewMovie } from "../protocols/movieProtocol.js";
import { connection } from "../config/database.js";


export async function insertMovie(movie: NewMovie): Promise<QueryResult> {
    return await connection.query(`INSERT INTO movies (title, genres, platform, watched) VALUES ($1, $2, $3, false)`, [movie.title, movie.genres, movie.platform])
}

export async function getMoviesList(): Promise<QueryResult<string[]>>{
    return await connection.query(`SELECT * FROM movies`)
}