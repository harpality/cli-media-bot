//modules

let dotenv = require("dotenv").config();
let axios = require("axios");
let moment = require("moment");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let fs = require('fs');

var spotify = new Spotify(keys.spotify);

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
            if (movie.Title == undefined) {
                console.log("There was no movie found in our database.")
            } else {
            // console.log(JSON.stringify(movie, null, 2));
            console.log(`The title is "${movie.Title}".`);
            console.log(`It came out in the year ${movie.Year}.`);
            console.log(`IMDB rated it a ${movie.imdbRating}.`)
            console.log(`Rotten Tomatoes gives it a rating of ${movie.Ratings[1].Value}.`)
            console.log(`Country: ${movie.Country}.`)
            console.log(`The plot is "${movie.Plot}"`)
            console.log(`The main actors are: ${movie.Actors}.`)
        } 
    })

}


// bands in town

function getBands() {

    let artist = process.argv.slice(3).join(" ");
    console.log("\n" + artist + " tour dates:");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(res) {
            // console.log(res);
            if (res.data.length === 0 || res.data.errorMessage || res.data[0].venue === undefined) {
                console.log("Sorry, no tour dates currently scheduled.")
            } else if (res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {    
                    if (res.data[i].venue.region === "") {
                        console.log(`\n${res.data[i].venue.name} - ${res.data[i].venue.city}, ${res.data[i].venue.country} - ${moment(res.data[i].datetime).format("MM/DD/YYYY")}`);
                    } else {
                        console.log(`\n${res.data[i].venue.name} - ${res.data[i].venue.city}, ${res.data[i].venue.region} ${res.data[i].venue.country} - ${moment(res.data[i].datetime).format("MM/DD/YYYY")}`);
                    }
                }
                }
            }
        )

};

function getSong() {
    let song = process.argv.slice(3).join(" ");

spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    let spot = response.tracks.items[0];
    console.log(spot);
    console.log(spot.artists[0].name);
  })
  .catch(function(err) {
    console.log(err);
  });
}

// Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from





if (arg2 === "movie-this") {
    getFilm();
} else if (arg2 === "concert-this") {
    getBands();
} else if (arg2 === "spotify-this-song") {
    getSong();
}
