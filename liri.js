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
  
    let query = process.argv.slice(3).join(" ");
    console.log(query);
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


// bands in town

function getBands() {

    let artist = process.argv.slice(3).join(" ");
    console.log(artist);
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(res) {
        console.log(`${res.data[0].venue.name} in ${res.data[0].venue.city}, ${res.data[0].venue.region}` );
    }
)

}

if (arg2 === "movie-this") {
    getFilm();
} else if (arg2 === "concert-this") {
    getBands();
}
