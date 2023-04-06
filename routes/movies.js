const express = require("express");
const router = express.Router();

const MovieModel = require("../models/Movie.model");
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

module.exports = router;
