$(document).ready(function() {
    const apiKey = "YOUR_OMDB_API_KEY"; 
  
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
  
      $.ajax({
        url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
        method: "GET",
        success: function(response) {
          if(response.Response === "True") {
            displayResults(response.Search);
          } else {
            $("#results-section").empty();
            $("#results-section").append(`<p>Film bulunamadı veya bir hata oluştu.</p>`);
          }
        },
        error: function() {
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      });
    }
  
    function displayResults(movies) {
      $("#results-section").empty();
  
      movies.forEach(movie => {
        let poster = movie.Poster !== "N/A" ? movie.Poster : "Img/default_poster.png";
        let title = movie.Title;
        let year = movie.Year;
  
        let movieCard = `
          <div class="movie-card">
            <img src="${poster}" alt="${title}" />
            <div class="movie-info">
              <h3>${title}</h3>
              <p>${year}</p>
            </div>
          </div>
        `;
        $("#results-section").append(movieCard);
      });
    }
  });
  