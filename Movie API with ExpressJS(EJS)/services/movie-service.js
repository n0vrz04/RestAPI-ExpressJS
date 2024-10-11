const pool = require('../config/db')
const {SuccessResult} = require('../utils/results/result')
const {DATA_GET_SUCCESSFULLY, DATA_ADDED_SUCCESSFULLY, DATA_UPDATED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY} = require('../utils/constants/messages')
const Movie = require('../models/movies/movie')

const getAllMovies = async () => {
    const res = await pool.query('select * from movies m where m.deleted = 0')
    return new SuccessResult(DATA_GET_SUCCESSFULLY,Movie.mapAll(res.rows))
}

const getMovieById = async (id) => {
    const res = await pool.query('SELECT * FROM movies m WHERE m.id = $1 AND m.deleted = 0', [id])
    return new SuccessResult(DATA_GET_SUCCESSFULLY, res.rows[0])
}

const addMovie = async (movie) =>{
    const res = await pool.query('insert into movies(imdb,title,description) values($1,$2,$3)',[movie.imdb,movie.title,movie.description])
    return new SuccessResult(DATA_ADDED_SUCCESSFULLY,res.rows[0])
}

const updateMovie = async movie =>{
    const res = await pool.query('update movies set imdb = $2 , title = $3 , description = $4 where id = $1 returning *',
        [movie.id,movie.imdb,movie.title,movie.description]
    )
    return new SuccessResult(DATA_UPDATED_SUCCESSFULLY,res.rows[0])

}

const deleteMovie = async id =>{
    const res = await pool.query('delete from movies where id = $1 returning *',[id])
    return new SuccessResult(DATA_DELETED_SUCCESSFULLY,res.rows[0])
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
}

