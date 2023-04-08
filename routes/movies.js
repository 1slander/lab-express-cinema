const express = require("express");
const router = express.Router();

const MovieModel = require("../models/Movie.model");

// Create movie

router.get("/create-movies", (req, res) => res.render("create-movies"));
router.post("/create-movie", (req, res) => {
  const newMovie = req.body;
  newMovie.stars = ["1", "2"];
  newMovie.showtimes = ["1pm", "5pm"];
  MovieModel.create(newMovie)
    .then(() => res.render("success"))
    .catch((err) => console.log(err));
});

/* GET movies page */
router.get("/movies", (req, res, next) => {
  MovieModel.find()
    .then((allMoviesDB) => {
      console.log("Retrieved movies from DB:", allMoviesDB);
      //res.send("hello");
      res.render("movies", { movies: allMoviesDB });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
    });
});

router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;
  MovieModel.findById(movieId)
    .then((movie) => {
      console.log("Retrieved movie from DB:", movie);
      //res.send("hello");
      res.render("movies-details", { movie });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
    });
});

//Delete

router.post("/movies/:movieId/delete", async (req, res) => {
  const { movieId } = req.params;
  await MovieModel.findByIdAndDelete(movieId)
    .then(() => {
      res.render("success");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update

router.get("/movies/:movieId/edit", (req, res) => {
  const { movieId } = req.params;
  MovieModel.findById(movieId)
    .then((movieToEdit) => {
      res.render("movie-edit", { movie: movieToEdit });
    })
    .catch((err) => console.log(err));
});

router.post("/movies/:movieId/edit", (req, res) => {
  const { movieId } = req.params;
  const editedMovie = req.body;
  MovieModel.findByIdAndUpdate(movieId, editedMovie)
    .then(() => res.render("success"))
    .catch((err) => console.log(err));
});

module.exports = router;
