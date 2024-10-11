const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie-controller');

router.get('/', movieController.getMovieView);
router.get('/add', movieController.getMovieAddView);
router.post('/add', movieController.addMovie);
router.get('/:id/edit', movieController.getMovieUpdateView);
router.put('/:id', movieController.updateMovie); 
router.delete('/:id', movieController.deleteMovie); 

module.exports = router;