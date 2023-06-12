
  function fetchMovieData() {
    var movieInfo = document.getElementById('movie-info').value; 
    var apiKey = '10f524b1'; 
  }

    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'GET',
        dataType: 'json',
        data: {
          apikey: '10f524b1',
          t: movieTitle
        }}),
    then(function(response) {
      var movieData = response.data;
      document.getElementById('movie-info').innerHTML = '<h2>' + movieData.Title + '</h2><p>' + movieData.Plot + '</p>';
    })
    .catch(function(error) {
      console.log(error);
    });
