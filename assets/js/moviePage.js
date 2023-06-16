// Javascript Page for Movie/Drink Details page
// Movie card Elements
var movieCard = document.getElementById("movie-info");
var cocktailCard = document.getElementById("drink-info");

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

function pullMovieData(imdbTitleID) {
    // general details fetch based off IMBD title
    var movieDetailsURL = 'https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=' + imdbTitleID;

    fetch(movieDetailsURL, movieAPIkey)
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            movieDetails = data;
            console.log(movieDetails);
            pushMovieDetails(data);

        })
}

function pushMovieDetails(movieDetails) {
    // child 0 is image element
    movieCard.children[0].children[0].children[0].setAttribute("src", (movieDetails.title.image.url));
    movieCard.children[0].children[0].children[0].setAttribute("alt", "a movie poster for the film " + (movieDetails.title.title));
    // child 1 is movie title
    movieCard.children[0].children[1].children[0] = movieCard.children[0].children[1].children[0].append(movieDetails.title.title);
    // child 2 is further details
    movieCard.children[0].children[2].children[1] = movieCard.children[0].children[2].children[1].append(movieDetails.plotOutline.text);

}

function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('&');

    // Get the query and format values
    var imdbID = searchParamsArr[0].split('=').pop();
    var userGenre = searchParamsArr[1].split('=').pop();
    // var userGenre='horror';
    console.log(searchParamsArr, imdbID, userGenre);
    pullMovieData(imdbID);
    // pullMovieData(imdbTest);
    getCocktail(userGenre);
    // Call cocktailAPI function
}

var randomCocktail;
var drinkDetails;

function getCocktail(Genre) {
    var selectedGenre = Genre;
    console.log(selectedGenre);

    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
    var liquor;
    if (selectedGenre === "comedy") {
        liquor = "whiskey";
    } else if (selectedGenre === "horror") {
        liquor = "vodka";
    } else if (selectedGenre === "romance") {
        liquor = "wine";
    } else if (selectedGenre === "action") {
        liquor = "tequila";
    } else if (selectedGenre === "fantasy") {
        liquor = "rum";
    } else if (selectedGenre === "crime") {
        liquor = "bourbon";
    } else if (selectedGenre === "science fiction") {
        liquor = "absinthe";
    } else if (selectedGenre === "animation") {
        liquor = "brandy";
    } else {
        liquor = "gin";
    }

    apiUrl += liquor;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            // console.log(Math.floor(Math.random() * data.drinks.length))
            // console.log("example", data)

            randomCocktail = data.drinks[Math.floor(Math.random() * data.drinks.length)];
            var cocktailID = randomCocktail.idDrink;
            console.log(cocktailID);
            cocktailDetails(cocktailID);
            


        })
}

function pushCocktail(randomCocktail) {
    cocktailCard.children[0].children[0].children[0].setAttribute("src", (randomCocktail.strDrinkThumb));
    cocktailCard.children[0].children[0].children[0].setAttribute("alt", "an image of a cocktail called " + (randomCocktail.strDrink));
    cocktailCard.children[0].children[1].children[0].append(randomCocktail.strDrink);
    cocktailCard.children[0].children[2].children[1].append(drinkDetails.strInstructions);

}

function cocktailDetails(ID) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ID;
    console.log("apiurl: " + apiUrl);
    fetch(apiUrl)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            drinkDetails = data.drinks[0];
            console.log("details: " + drinkDetails.strInstructions);
            pushCocktail(randomCocktail);
        })
}


getParams();
