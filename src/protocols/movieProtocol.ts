
//tabela do banco
export type MovieEntity = {
    id?: number,
    title: string,
    genres: string, 
    platform: string,
    watched?: boolean,
    coment?: string,
}

export type NewMovie = Omit<MovieEntity, "id">