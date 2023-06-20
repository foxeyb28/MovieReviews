var searchResult = document.querySelector("#movieResult");
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {});
});

var testData;
var apiKey = '10f524b1';
var genreInput;
var userInput;
var movieAPIkey = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e342068b10mshd6c5bdbdfe36144p1b5760jsn4b8dd74d1dde',
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
};
// pull Movie Details
function getOmdbApi(movieID) {
  var requestUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&i=' + movieID;

  fetch(requestUrl)
    .then(function (response) {
      // console.log(response)
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      renderCard(data);
    });
  //utelly will tell me which streaming app to watch the movie on
}
// Function that uses RapidAPI 
function pullSearchResult(user) {
  var requestUrl = 'https://online-movie-database.p.rapidapi.com/title/v2/find?title=' + user + '&titleType=movie&limit=20&sortArg=user_rating%2Casc&genre=' + genreInput;
  // console.log(requestUrl);
  fetch(requestUrl, movieAPIkey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      testData = data.results;
      for (var i = 0; i < testData.length; i++) {
        // console.log(testData[i].title, testData[i].image.url);
        getOmdbApi(testData[i].id.split('/')[2]);
      }
    })
}

// push movie details into a card
function renderCard(movieDetails) {
  console.log("title: " + movieDetails.Title +
    "\nRating: " + movieDetails.imdbRating +
    "\nImg link: " + movieDetails.Poster +
    "\nimbdID: " + movieDetails.imdbID);
  // Create Div and give it columns to add movie images to
  var card = document.createElement("div");
  card.setAttribute("class", "col s2 frame");
  card.setAttribute("width", "100px");
  var title = document.createElement("img");
  title.setAttribute("src", movieDetails.Poster);
  card.appendChild(title);

  searchResult.append(card);
  card.addEventListener("click", function (event) {
    var queryString = './movie.html?movieID=' + movieDetails.imdbID + '&genre=' + genreInput;

    location.assign(queryString);

  })

}


$(document).ready(function () {
  $('select').formSelect();
});

// document.querySelector()
var button = document.querySelector("#search-button");
button.addEventListener("click", function (event) {
  // use event to prevent the default behavior of reloading
  event.preventDefault();
  console.log("input")

  // get a reference to genre input using  document.querySelector()
  genreInput = document.querySelector("#format-input").value;
  console.log(genreInput);
  // get the value from that input and print it to the console.

  userInput = document.querySelector("#search-input").value;
  console.log(userInput);
  pullSearchResult(userInput);
});