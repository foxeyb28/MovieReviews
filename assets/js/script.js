var apiKey = '10f524b1';
function getOmdbApi(movie) {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl = 'http://www.omdbapi.com/?apikey=' + apikey + '&s=' + movie + '&type=movie';

  fetch(requestUrl)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    });
  //utelly will tell me which streaming app to watch the movie on
}

// document.querySelector()
var button = document.querySelector("#search-button");
button.addEventListener("click", function (event) {
  // use event to prevent the default behavior of reloading
  event.preventDefault();
  console.log("input")

  // get a reference to genre input using  document.querySelector()
  var genreInput = document.querySelector("#format-input").value;
  console.log(genreInput);
  // get the value from that input and print it to the console.
});