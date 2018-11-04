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

let apiInfo = keys.apiInfo;
let omdbAPI = apiInfo.omdbAPI;
let bitAPI = apiInfo.bitAPI;
// console.log("apiInfo", apiInfo);
// console.log("omdbAPI", omdbAPI, "bitInfo", bitAPI);

let instruction = process.argv[2];
let searchItem = (process.argv.slice(3).join(" ")).trim();
console.log("sIg", searchItem);


// Function for concert=this 
function searchConcert(searchItem) {

  if (!searchItem) {
    searchItem = "Cardi+B";
  }
  console.log("sIm", searchItem);

  var queryURL = "https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=" + bitAPI;
  //testURL = https://rest.bandsintown.com/artists/old+/events?app_id=eab521ae94947d8c4ef06919d269b29e

  console.log("qUrlc", queryURL);

  request(queryURL, function (err, res, body) {
    if (err) throw err;
    //console.log('response', res, res.statusCode);
    let json = JSON.parse(body);
    //console.log(json);
    for (let i = 0; i < json.length; i++) {
      // let Date = moment(json[i].datetime).format("MM/DD/YYYY");
      // console.log("date", Date);

      console.log(`Band name: ${json[i].lineup}\nVenue: ${json[i].venue.name}\nVenue City: ${json[i].venue.city}\nDate: ${moment(json[i].datetime).format("MM/DD/YYYY")}\nURL: ${json[i].url}\n\n\n`);

    }; //forLoop close

  }); //close request concerts

}; //close searchConcert




let getArtistName = function (artist) {
  return artist.name;
};

//function for spotify-this-song
function searchSpotify(searchItem) {

  if (!searchItem) {
    searchItem = "The+Sign";
  }
  console.log("sIm", searchItem);

  spotify
    .search({ type: "track", query: searchItem, limit: 3 })
    .then(function (response) {

      let json = JSON.stringify(response, null, 2);
      console.log("json", json);

      //console.log("Artist Name", response.tracks.items[0].album.artists[0].name);
      //console.log("Album Name", response.tracks.items[0].album.name);

      var songs = response.tracks.items;

      for (let i = 0; i < songs.length; i++) {
        console.log(`Artist: ${songs[i].artists.map(getArtistName)}\nSong Name: ${songs[i].name}\nPreview: ${songs[i].preview_url}\nAlbum Name: ${songs[i].album.name}\n\n\n`)
      }

    })
    .catch(function (err) {
      console.log(err);
    });


} //close searchSpotify





//function for movie-this
function searchMovie(searchItem) {

  if (!searchItem) {
    searchItem = "Mr+Nobody";
  }

  console.log("sIm", searchItem);

  let queryURL = "https://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=" + omdbAPI;

  console.log("qUrlm", queryURL);

  request(queryURL, function (err, res, body) {
    if (err) throw err;
    //console.log('response', res, res.statusCode);
    let json = JSON.parse(body);
    console.log("JSON", json);
    console.log(`${json.Title} was released in ${json.Year}.`);
    console.log(`The plot: ${json.Plot}`);

  });  //close request

}; //close searchMovie


function doWhatItSays() {

  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
    var dwisArr = data.split(",");
    console.log("dwisArr", dwisArr);
    instruction = dwisArr[0];
    searchItem = dwisArr[1];
    startSearch(instruction, searchItem);

  });

} //close doWhatItSays


function startSearch(instruction, searchItem) {

  switch (instruction) {
    case "concert-this":
      console.log("instruction = concert-this");
      searchConcert(searchItem);
      break;
    case "spotify-this-song":
      console.log("instruction = spotify-this-song");
      searchSpotify(searchItem);
      break;
    case "movie-this":
      console.log("instruction = movie-this");
      searchMovie(searchItem);
      break;
    case "do-what-it-says":
      console.log("instruction = do-what-it-says");
      doWhatItSays();
      break;
    default:
      console.log("Please input a valid instruction: concert-this, spotify-this-song, movie-this or do-what-it-says");
  }; //close switch

}; //close startSearch

startSearch(instruction, searchItem);



