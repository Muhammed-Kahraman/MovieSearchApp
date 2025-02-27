$(document).ready(function() {
    const apiKey = "YOUR_API_KEY";

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
    let currentImdbId = "";

    function fetchMovies(apiKey, randomTerm, page = 1, results = []) {
        document.getElementById('spinnerOverlay').classList.add('show');
        $.ajax({
            url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${randomTerm}&page=${page}`,
            method: "GET",
            success: function(response) {
                if (response.Response === "True") {
                    results = results.concat(response.Search);
                    let divAreaId = "#random_movie_area";
                    displayResults(results, divAreaId);

                    let pagination_element = document.getElementById("pagination");
                    pagination_element.innerHTML = "";

                    let totalPages = Math.ceil(parseInt(response.totalResults) / 10);
                    let currentGroup = Math.floor((page - 1) / 10);
                    let startPage = currentGroup * 10;
                    let endPage = Math.min(startPage + 10, totalPages);

                    if (currentGroup > 0) {
                        let prev_li = document.createElement("li");
                        prev_li.classList.add("page-item", "pointer");
                        let prev_a = document.createElement("a");
                        prev_a.classList.add("page-link");
                        prev_a.href = "#";
                        prev_a.textContent = "Previous";
                        prev_a.addEventListener("click", function(event) {
                            event.preventDefault();
                            document.getElementById('spinnerOverlay').classList.add('show');
                            fetchMovies(apiKey, randomTerm, startPage);
                        });
                        prev_li.appendChild(prev_a);
                        pagination_element.appendChild(prev_li);
                    }

                    for (let i = startPage; i < endPage; i++) {
                        let page_li = document.createElement("li");
                        page_li.classList.add("page-item", "pointer");
                        if (page === i + 1) {
                            page_li.classList.add("active");
                        }
                        let page_a = document.createElement("a");
                        page_a.classList.add("page-link");
                        page_a.href = "#";
                        page_a.textContent = i + 1;
                        page_a.addEventListener("click", function(event) {
                            event.preventDefault();
                            document.getElementById('spinnerOverlay').classList.add('show');
                            fetchMovies(apiKey, randomTerm, i + 1);
                        });
                        page_li.appendChild(page_a);
                        pagination_element.appendChild(page_li);
                    }

                    if (endPage < totalPages) {
                        let next_li = document.createElement("li");
                        next_li.classList.add("page-item", "pointer");
                        let next_a = document.createElement("a");
                        next_a.classList.add("page-link");
                        next_a.href = "#";
                        next_a.textContent = "Next";
                        next_a.addEventListener("click", function(event) {
                            event.preventDefault();
                            document.getElementById('spinnerOverlay').classList.add('show');
                            fetchMovies(apiKey, randomTerm, endPage + 1);
                        });
                        next_li.appendChild(next_a);
                        pagination_element.appendChild(next_li);
                    }

                    document.getElementById('spinnerOverlay').classList.remove('show');
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
    //Her ana sayfa yenilendiğinde farklı türde filmler getirilsin istiyorsanız aşağıdaki satırları yorum satırı yapın.
    let random_area = document.getElementById("random_movie_area");
    if (random_area.children.length === 0) {
        fetchMovies(apiKey, "Batman");
    }

    $("#search-button").click(function() {
        searchMovies();
    });

    $("#search-input").keypress(function(event) {
        if (event.which === 13) {
            searchMovies();
        }
    });

    function searchMovies() {
        let query = $("#search-input").val().trim();
        if (!query) {
            alert("Lütfen bir film adı giriniz.");
            return;
        }
        document.getElementById('spinnerOverlay').classList.add('show');
        fetchMovies(apiKey, query);
    }

    function loadMovieDetail(imdbId) {
        document.getElementById('spinnerOverlay').classList.add('show');
        $.ajax({
            url: "Movie_Detail.html",
            method: "GET",
            success: function(response) {
                $('#movieDetailContent').html(response);
                localStorage.setItem("imdbId", imdbId);
                $('#movieDetailModal').modal('show');
                document.getElementById('spinnerOverlay').classList.remove('show');
            },
            error: function() {
                alert("An error occurred while loading the movie details.");
                document.getElementById('spinnerOverlay').classList.remove('show');
            }
        });
    }

    function createMovieInfo(title, year, imdbId) {
        debugger
        let movie_info = document.createElement("div");
        movie_info.classList.add("movie-info");
        let movie_title = document.createElement("h3");
        movie_title.textContent = title;
        let movie_realese_date = document.createElement("p");
        movie_realese_date.textContent = year;
        let movie_detail_button = document.createElement("button");
        movie_detail_button.textContent = "Details";
        movie_detail_button.classList.add("btn", "btn-sm", "pt-2", "pb-2", "pe-3", "ps-3", "detail_button");
        movie_detail_button.setAttribute("data-imdbId", imdbId);
        movie_detail_button.onclick = function() {
            loadMovieDetail(movie_detail_button.getAttribute("data-imdbId"));
        };

        movie_info.append(movie_title, movie_realese_date, movie_detail_button);
        return movie_info;
    }

    function displayResults(movies, divAreaId) {
        $("#results-section").empty();
        $("#random_movie_area").empty();
        movies.forEach((movie, index) => {
            debugger
            let poster = movie.Poster !== "N/A" ? movie.Poster : "Img/default_poster.svg";
            let title = movie.Title !== "N/A" && movie.Title !== null && movie.Title !== undefined ? movie.Title : "Bilinmiyor";
            let movie_card = document.createElement("div");
            movie_card.classList.add("movie-card");

            let wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            let content = document.createElement("div");
            content.classList.add("content");
            let movie_poster = document.createElement("img");
            movie_poster.id = "movie-poster" + index;
            movie_poster.classList.add("opacity-0.8");
            movie_poster.src = poster;
            movie_poster.alt = title;
            movie_poster.onerror = () => {
                movie_poster.src = "Img/default_poster.svg";
            };
            content.append(movie_poster);
            let span = document.createElement("span");
            let bookmark = document.createElement("i");
            bookmark.classList.add("fa-regular", "fa-bookmark");
            bookmark.style.color = "#74C0FC";
            bookmark.setAttribute("data-imdbId", movie.imdbID);
            let bookmarkedMovies = JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];
            if (bookmarkedMovies.length > 0 && bookmarkedMovies.filter(bookmark => bookmark.imdbID.toString().includes(movie.imdbID)).length > 0) {
                // bookmarkedMovies = bookmarkedMovies.filter(id => id.imdbID !== movie.imdbID);
                bookmark.classList.add("fa-solid");
                bookmark.classList.remove("fa-regular");
                bookmark.classList.remove("bookmarked");
            } else {
                let bookmarkedMovie = {};
                bookmarkedMovie[movie.imdbID] = movie;
                bookmarkedMovies.push(bookmarkedMovie);
                bookmark.classList.add("fa-regular");
                bookmark.classList.remove("fa-solid");
                bookmark.classList.add("bookmarked");
            }
            bookmark.onclick = function() {
                debugger
                let bookmarkedMovies = JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];
                let imdbId = bookmark.getAttribute("data-imdbId");
                if (bookmarkedMovies.length > 0 && bookmarkedMovies.filter(bookmark => bookmark.imdbID.includes(movie.imdbID)).length > 0) {
                    bookmarkedMovies = bookmarkedMovies.filter(id => id.imdbID !== movie.imdbID);
                    bookmark.classList.remove("fa-solid");
                    bookmark.classList.add("fa-regular");
                    bookmark.classList.remove("bookmarked");
                } else {
                    let bookmarkedMovie = {};
                    bookmarkedMovie = movie;
                    bookmarkedMovies.push(bookmarkedMovie);
                    bookmark.classList.remove("fa-regular");
                    bookmark.classList.add("fa-solid");
                    bookmark.classList.add("bookmarked");
                }
                localStorage.setItem("bookmarkedMovies", JSON.stringify(bookmarkedMovies));
            };
            span.append(bookmark);
            content.append(span);
            wrapper.append(content);
            movie_card.append(wrapper);
            movie_card.append(createMovieInfo(title, movie.Year, movie.imdbID));
            $(divAreaId).append(movie_card);
        });
    }
});