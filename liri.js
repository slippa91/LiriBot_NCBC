//Dependencies
require("dotenv").config();

var Spotify = require("node-spotify-api");
var request = require("request");
var moment = require("moment");

var fs = require("fs");

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
console.log("spotify", spotify);