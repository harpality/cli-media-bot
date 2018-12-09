//modules

let dotenv = require("dotenv").config();
let axios = require("axios");
let moment = require("moment");
let keys = require("./keys.js");
let spotify = require("node-spotify-api");
let fs = require('fs');


let arg2 = process.argv[2];
let arg3 = process.argv[3];


// console.log(keys.spotify);

//omdb 

function getFilm() {
  
    let query = arg3;
    axios.get("https://www.omdbapi.com/?t="+ query +"&apikey=c4a1de54").then(
    function(res) {
        let movie = res.data;
        // console.log(JSON.stringify(movie, null, 2));
        console.log(`The movie title is "${movie.Title}".`);
        console.log(`It came out in the year ${movie.Year}.`);
        console.log(`IMDB rated it a ${movie.imdbRating}.`)
        console.log(`Rotten Tomatoes gives it a rating of ${movie.Ratings[1].Value}.`)
        console.log(`It was produced in ${movie.Country}.`)
        console.log(`The plot is "${movie.Plot}"`)
        console.log(`The main actors are: ${movie.Actors}.`)
    }
)

}

if (arg2 === "movie-this") {
    getFilm();
}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.