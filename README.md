# LIRI - a command line bot 🤖

### Overview 
LIRI (Language Interpretation and Recognition Interface) is a node.js command line bot that quickly searches OMDB, BandsInTown, and Spotify for movie, concert, and song information.

### Install
Clone this folder to your hard drive and then run 
```npm install```.

This will install the following dependencies:
```dotenv
   axios
   moment
   node-spotify-api
   fs
```


### Commands
* Use the following commands followed by your search query.
```
   node liri spotify-this-song 
   node liri movie-this 
   node liri concert-this 
   node liri do-what-it-says
```

#### 🎵 Spotify This Song 
* Returns the following details for a song title entered.

![spotify-this-song](https://media.giphy.com/media/iOyvyUUv4iswBs0YFo/giphy.gif)

* If nothing is entered, it will default to the following.

![spotify-this-song-default](https://media.giphy.com/media/1BfScEKilyculMg9Td/giphy.gif)

#### 🎺 Concert This 
* Returns the upcoming tour dates in a list for the artist entered.

![concert-this](https://media.giphy.com/media/NVmIVsl6nzAaBecLqY/giphy.gif)

#### 🍿 Movie This 
* Returns the following details for the movie entered.

![movie-this](https://media.giphy.com/media/7E5hQbLSk3ZcJ0WV6q/giphy.gif)

* If nothing is entered, it will default to the following.

![movie-this-default](https://media.giphy.com/media/nbaKTJsh0L5IkQ00tS/giphy.gif)

#### 🗒️ Do What It Says 
* Returns the text that is located in random.txt. In this case its 
```spotify-this-song,"I Want it That Way"```

![do-what-it-says](https://media.giphy.com/media/65R0TGG5ORnfxr8Ifx/giphy.gif)