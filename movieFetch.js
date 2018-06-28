const fetch = require('node-fetch')

genreUrl ='https://api.themoviedb.org/3/genre/movie/list?api_key=9eed022e522148efdb5a1fc5d8900333&language=en-US'
function getMovieIDs(pageNo) {
    if (pageNo === null || pageNo === undefined)
        pageNo = 1

    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=9eed022e522148efdb5a1fc5d8900333&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pageNo
    console.log("Url: " + url);
  
  return fetch(url, {method: 'get'})
    .then(response => response.json())
}

function getPopularMovies(pageNo) {

    if (pageNo === null || pageNo === undefined)
        pageNo = 1

    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=9eed022e522148efdb5a1fc5d8900333&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pageNo
    // console.log("Url: " + url);
    var imgSrc = 'https://image.tmdb.org/t/p/w500/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg'
    var movieData = []
    var movies = []
    var temp = fetch(url, {
            method: 'get'
        })
        .then(response => {
            response.json()
            console.log(response.json())
            for (var i = 0; i < response.results.length; i++) {
                movies[i] = response.results[i].id
            }
            for (i = 0; i < movies.length; i++) {
                var data = []
                var movieUrl = 'https://api.themoviedb.org/3/movie/' + movies[i] + '?api_key=9eed022e522148efdb5a1fc5d8900333&language=en-US';
                fetch(movieUrl, {
                        method: 'get'
                    })
                    .then(response => {
                        data = []
                        var genres = []
                        for (var g = 0; g < response.genres.length; g++) {
                            genres[g] = response.genres[g].name
                        }
                        data.push({
                            id: response.id,
                            release_date: response.release_date,
                            synopsis: response.overview,
                            img: 'https://image.tmdb.org/t/p/w500' + response.poster_path,
                            genres: genres
                        })
                    })
                movieData = movieData.concat(data)
            }
        });

    return movieData
}

getMovieIDs()
    .then((rdata) => {
        console.log(rdata.results)
    })