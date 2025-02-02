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
    
    const randomTerm = randomSearchTerms[Math.floor(Math.random() *randomSearchTerms.length)];
    $("#loading-indicator").removeClass("d-none");;
    $.ajax({
      url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${randomTerm}`,
      method: "GET",
      success: function(response) {
        if(response.Response === "True") 
        {
          let divAreaId = "#random_movie_area";
          displayResults(response.Search, divAreaId);
          $("#loading-indicator").addClass("d-none");
        } 
        else 
        {
          $("#random_movie_area").empty();
          $("#random_movie_area").append(`<p>Film bulunamadı veya bir hata oluştu.</p>`);
          $("#loading-indicator").addClass("d-none");
        }
      },
      error: function() {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        $("#loading-indicator").addClass("d-none");
      }
    });

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
      if(!query) {
        alert("Lütfen bir film adı giriniz.");
        return;
      }
      $("#loading-indicator").removeClass("d-none");;
      $.ajax({
        url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
        method: "GET",
        success: function(response) {
          debugger
          if(response.Response === "True") 
          {
            let divAreaId = "#results-section";
            displayResults(response.Search, divAreaId);
            $("#loading-indicator").addClass("d-none");
          } 
          else 
          {
            $("#results-section").empty();
            $("#results-section").append(`<p>Film bulunamadı veya bir hata oluştu.</p>`);
            $("#loading-indicator").addClass("d-none");
          }
        },
        error: function() {
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
          $("#loading-indicator").addClass("d-none");
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
      movie_info.append(movie_title, movie_realese_date);
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
  