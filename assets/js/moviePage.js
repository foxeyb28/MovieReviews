// Javascript Page for Movie/Drink Details page

// Movie card Elements
var movieCard = document.getElementById("movie-info");

// API key for Online Movie Database from RapidAPI
var movieAPIkey = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '1cdac887f3msh05eda135c041876p1e7b93jsn43c9489628a4',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
}

var movieDetails;  // variable that holds all info from pullMovie Data function

// Examples of ways to pull data:
// movieDetails.tile.title RETURNS "movie Name"
// movieDetails.genres[0] RETURNS  'First listed Genre'
// movieDetails.ratings.rating RETURNS 10.0
// movieDetails.plotOutline.text RETURNS breif summary of movie


var imdbTest = 'tt3794354';
// Function that fetches General Movie Data to add to Movie Card HTML

// Function takes information from Index.HMTL Search Result that is clicked
// imdbTitleID taken from Local Storage Maybe???

function pullMovieData(imdbTitleID){
    // general details fetch based off IMBD title
    var movieDetailsURL= 'https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=' + imdbTitleID;
    
    fetch(movieDetailsURL, movieAPIkey)
        .then(function(response){
            // console.log(response);
            return response.json();
        })
        .then (function (data){
            movieDetails = data;
            pushMovieDetails(movieDetails);
        })
 }

function pushMovieDetails(movieDetails){
    // child 0 is image element
    movieCard.children[0].setAttribute("src", (movieDetails.title.image.url));
    movieCard.children[0].setAttribute("alt", "a movie poster for the film "+ (movieDetails.title.title));
    // child 1 is movie title
    movieCard.children[1] = movieCard.children[1].append(movieDetails.title.title);
    // child 2 is further details
    movieCard.children[2] = movieCard.children[2].append(movieDetails.plotOutline.text); 
}

 pullMovieData(imdbTest);