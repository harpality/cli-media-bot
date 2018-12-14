/**
 * Dependencies
 */
let dotenv = require("dotenv").config();
let axios = require("axios");
let moment = require("moment");
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let fs = require('fs');

/** 
 * Takes in the users query and logs movie data from the OMDB API
 * @param  {string} query is the users search query
 */
function getFilm(query) {
    if (query == "") {
        query = "Mr Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + query + "&apikey=c4a1de54").then(
        function (res) {
            let movie = res.data;
            if (movie.Title == undefined) {
                console.log("There was no movie found in our database.")
            } else {
                console.log(`\nThe title is "${movie.Title}".`);
                console.log(`It came out in ${movie.Year}.`);
                console.log(`IMDB rated it a ${movie.imdbRating}.`)
                if (!movie.Ratings[1]) {
                    console.log(`No Rotten Tomatoes rating.`)
                } else {
                    console.log(`Rotten Tomatoes gives it a rating of ${movie.Ratings[1].Value}.`)
                }
                console.log(`Country: ${movie.Country}.`)
                console.log(`Languages: ${movie.Language}.`)
                console.log(`The plot is "${movie.Plot}"`)
                console.log(`The main actors are: ${movie.Actors}.\n`)
            }
        })
}

/** 
 * Takes in the users query and logs concert data from the BandsinTown API
 * @param  {string} artist is the name of the band entered by the user
 */
function getBands(artist) {
    console.log("\n" + artist.toUpperCase() + " tour dates:");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (res) {
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
                console.log("\n");
            }
        }
    )
};

/**  
 * Takes in the users query and logs song data from Spotify's API
 * @param  {string} song is name of the song entered by the user
 */
function getSong(song) {
    let spotify = new Spotify(keys.spotify);
    if (song == "") {
        song = "the sign ace of base";
    }
    spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function (response) {
            for (let i = 0; i < response.tracks.items.length; i++) {
                let spot = response.tracks.items[i];
                console.log(`\nArtist: ${spot.artists[0].name}`);
                console.log(`Title: ${spot.name}`);
                console.log(`Soundclip: ${spot.external_urls.spotify}`)
                console.log(`From the album, "${spot.album.name}."\n`)
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

/** 
 * Reads the random.txt file and then pushes data through the appropriate API
 */
function doWhat() {
    let fileName = 'random.txt';
    fs.readFile(fileName, 'utf8', function (error, data) {
        if (error) {
            console.log(`Error message: ${error}`)
        }
        let random = (data.split(","));
        if (random[0] === "movie-this") {
            getFilm(random[1]);
        } else if (random[0] === "concert-this") {
            getBands(random[1]);
        } else if (random[0] === "spotify-this-song") {
            getSong(random[1]);
        }
    })
};

/**
 * Takes the keyword entered by user and chooses the appropriate function to call
 */
let arg2 = process.argv[2];
let arg3 = process.argv.slice(3).join(" ");

switch (arg2) {
    case "movie-this":
        getFilm(arg3);
        break;
    case "concert-this":
        getBands(arg3);
        break;
    case "spotify-this-song":
        getSong(arg3);
        break;
    case "do-what-it-says":
        doWhat();
        break;
    default: console.log(`\nNo option selected. \nYou must select from 'movie-this', 'concert-this', or 'spotify-this-song'\n`)
}