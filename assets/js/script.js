var searchResult = document.querySelector("#movieResult");
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {});
});

var apiKey = '10f524b1';
var genreInput;
var movieAPIkey = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1cdac887f3msh05eda135c041876p1e7b93jsn43c9489628a4',
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
};
// pull Movie Details
function getOmdbApi(movieID) {
  var requestUrl = 'http://www.omdbapi.com/?apikey=' + apiKey + '&i=' + movieID;

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
function pullSearchResult(genre) {
  var requestUrl = 'https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=' + genre + '&limit=30';

  fetch(requestUrl, movieAPIkey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i<data.length; i++){
        // console.log(data[i].split('/')[2]);
        getOmdbApi(data[i].split('/')[2]);
      }
    })
}

// push movie details into a card
function renderCard(movieDetails) {
  console.log("title: " + movieDetails.Title +
  "\nRating: "+ movieDetails.imdbRating+
  "\nImg link: "+ movieDetails.Poster+
  "\nimbdID: "+ movieDetails.imdbID);
  var card = document.createElement("div");
  var title = document.createElement("h1");
  title.textContent = movieDetails.Title;
  card.appendChild(title);
  searchResult.append(card);
  card.addEventListener("click", function(event){
    var queryString = './movie.html?movieID=' + movieDetails.imdbID + '&genre=' + genreInput;
  
    location.assign(queryString);  

  } )

}


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
  pullSearchResult(genreInput);
});