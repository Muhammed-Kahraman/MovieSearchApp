$(document).ready(function() {
    const apiKey = "38e8b0b"; 

    const randomSearchTerms = [
      'action', 'adventure', 'animation', 'biography', 'comedy', 'crime', 'documentary', 'drama', 
      'family', 'fantasy', 'film-noir', 'history', 'horror', 'musical', 'mystery', 'romance', 
      'sci-fi', 'sport', 'thriller', 'war', 'western', 'superhero', 'indie', 'crime-drama', 
      'psychological', 'satire', 'dark-comedy', 'historical', 'epic', 'heist', 'spy', 'political', 
      'courtroom', 'detective', 'martial-arts', 'cyberpunk', 'steampunk', 'post-apocalyptic', 
      'dystopian', 'time-travel', 'space', 'alien', 'paranormal', 'slasher', 'vampire', 'zombie', 
      'werewolf', 'monster', 'kaiju', 'gothic', 'folk-horror', 'found-footage', 'mockumentary', 
      'survival', 'disaster', 'melodrama', 'road-movie', 'buddy-comedy', 'coming-of-age', 'noir', 
      'silent-film', 'experimental', 'arthouse', 'short-film', 'musical-drama', 'music-documentary', 
      'dance', 'fantasy-adventure', 'historical-fiction', 'teen-drama', 'high-school', 'school-life', 
      'sports-drama', 'biopic', 'spy-thriller', 'true-crime', 'war-documentary', 'revenge', 'sword-and-sorcery'
    ];
    
    const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
    document.getElementById('spinnerOverlay').classList.add('show');
    
    page = 1;
  results = [];
  function fetchMovies(apiKey, randomTerm, page = 1, results = []) {
    $.ajax({
      url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${randomTerm}&page=${page}`,
      method: "GET",
      success: function(response) {
        if (response.Response === "True") {
          results = results.concat(response.Search);
 
          if (results.length < parseInt(response.totalResults) && response.Search.length === 10) {
            fetchMovies(apiKey, randomTerm, page + 1, results);
          }
          else {
            let divAreaId = "#random_movie_area";
            displayResults(results, divAreaId);
            document.getElementById('spinnerOverlay').classList.remove('show');
          }
        } else {
          $("#random_movie_area").empty();
          $("#random_movie_area").append(`<p>Film bulunamadı veya bir hata oluştu.</p>`);
          document.getElementById('spinnerOverlay').classList.remove('show');
        }
      },
      error: function() {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        document.getElementById('spinnerOverlay').classList.remove('show');
      }
    });
  }
 
  // Kullanım:
  fetchMovies(apiKey, randomTerm);

    $("#search-button").click(function() {
      searchMovies();
    });
  
    $("#search-input").keypress(function(event) {
      if(event.which === 13) { 
        searchMovies();
      }
    });
  
    function searchMovies() {
      let query = $("#search-input").val().trim();
      let query2 = $("#search-input2").val().trim();
      if(!query && !query2) {
        alert("Lütfen bir film adı giriniz.");
        return;
      }
      document.getElementById('spinnerOverlay').classList.add('show');
      $.ajax({
        url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${query != "" ? query : query2}`,
        method: "GET",
        success: function(response) {
          if(response.Response === "True") 
          {
            let divAreaId = "#results-section";
            displayResults(response.Search, divAreaId);
            document.getElementById('spinnerOverlay').classList.remove('show');
          } 
          else 
          {
            $("#results-section").empty();
            $("#results-section").append(`<p>Film bulunamadı veya bir hata oluştu.</p>`);
            document.getElementById('spinnerOverlay').classList.remove('show');
          }
        },
        error: function() {
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
          document.getElementById('spinnerOverlay').classList.remove('show');
        }
      });
    }
    function createMovieInfo(title, year) {
      let movie_info = document.createElement("div");
      movie_info.classList.add("movie-info");
      let movie_title = document.createElement("h3");
      movie_title.textContent = title;
      let movie_realese_date = document.createElement("p");
      movie_realese_date.textContent = year;
      movie_detail_button = document.createElement("button");
      movie_detail_button.textContent = "Details";
      movie_detail_button.classList.add("btn", "btn-primary", "btn-sm");
      movie_detail_button.onclick = function() {};
      movie_info.append(movie_title, movie_realese_date, movie_detail_button);
      return movie_info;
    }
    function displayResults(movies, divAreaId) {
      $("#results-section").empty();
      $("#random_movie_area").empty();
      movies.forEach((movie, index) => {
        let poster = movie.Poster !== "N/A" ? movie.Poster : "Img/default_poster.svg";
        let title = movie.Title !== "N/A" && movie.Title !== null && movie.Title !== undefined ? movie.Title : "Bilinmiyor";
        let movie_card = document.createElement("div");
        movie_card.classList.add("movie-card");

        let movie_poster = document.createElement("img");
        movie_poster.id = "movie-poster" + index;
        movie_poster.src = poster;
        movie_poster.alt = title;
        movie_poster.onerror = () => {
          movie_poster.src = "Img/default_poster.svg";
        };

        movie_card.append(movie_poster);
        movie_card.append(createMovieInfo(title, movie.Year));
        $(divAreaId).append(movie_card);
      });
    }
  });
  