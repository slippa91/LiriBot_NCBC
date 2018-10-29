//Dependencies
require("dotenv").config();

const fs = require('fs');
const request = require('request');


let Spotify = require("node-spotify-api");
let moment = require("moment");

let keys = require("./keys");

let spotify = new Spotify(keys.spotify);
let spID = spotify.credentials.id;
let spSecret = spotify.credentials.secret;
// console.log("spotify", spotify);
// console.log("spID", spID, "spSecret", spSecret);

var apiInfo = keys.apiInfo;
let omdbAPI = apiInfo.omdbAPI;
let bitAPI = apiInfo.bitAPI;
// console.log("apiInfo", apiInfo);
// console.log("omdbAPI", omdbAPI, "bitInfo", bitAPI);

let instruction = process.argv[2];


switch (instruction) {
  case "concert-this":
    console.log("instruction = concert-this");
    break;
  case "spotify-this-song":
    console.log("instruction = spotify-this-spng");
    break;
  case "movie-this":
    console.log("instruction = movie-this");
    break;
  case "do-what-it-says":
    console.log("instruction = do-what-it-says");
    break;
  default:
    console.log("Please input a valid instruction");
};



