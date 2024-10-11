const MovieAddDTO = require('../models/movies/movieAdd');
const MovieUpdateDTO = require('../models/movies/movieUpdate');
const movieService = require('../services/movie-service');

const getMovieView = async (req, res) => {
    const result = await movieService.getAllMovies();
    if (result.success) {
        res.render('movies/index', { data: result.data });
    } else {
        res.render('movies/index');
    }
};

const getMovieAddView = async (req, res) => {
    res.render('movies/addMovie');
};

const getMovieUpdateView = async (req, res) => {
    const id = req.params.id;
    const result = await movieService.getMovieById(id);
    if (result.success) {
        res.render('movies/updateMovie', { movie: result.data });
    } else {
        res.status(404).send('Movie not found');
    }
};

const addMovie = async (req, res) => {
    const movieAddDto = new MovieAddDTO(req.body);
    const result = await movieService.addMovie(movieAddDto);
    if (result.success) {
        res.redirect('/movies');
    } else {
        res.status(400).send('Failed to add movie');
    }
};

const updateMovie = async (req, res) => {
    const movieUpdateDto = new MovieUpdateDTO(req.body);
    movieUpdateDto.id = req.params.id;
    const result = await movieService.updateMovie(movieUpdateDto);
    if (result.success) {
        res.redirect('/movies');
    } else {
        res.status(400).send('Failed to update movie');
    }
};

const deleteMovie = async (req, res) => {
    const result = await movieService.deleteMovie(req.params.id);
    if (result.success) {
        res.redirect('/movies');
    } else {
        res.status(404).send('Movie not found');
    }
};

module.exports = {
    getMovieView,
    getMovieAddView,
    getMovieUpdateView,
    addMovie,
    updateMovie,
    deleteMovie
};
