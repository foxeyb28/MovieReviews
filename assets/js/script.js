var apikey = "";
function getOmdbApi(movie) {
    // replace `octocat` with anyone else's GitHub username
    var requestUrl = 'http://www.omdbapi.com/?apikey='+apikey+'&s='+movie+'&type=movie';
  
    fetch(requestUrl)
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        
      });
  }
  //utelly will tell me which streaming app to watch the movie on
  