const fetch = require('node-fetch')
// import fetch from 'fetch-with-proxy';

const fs = require('fs')
var HttpsProxyAgent = require('https-proxy-agent');

const genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9eed022e522148efdb5a1fc5d8900333&language=en-US'
genres = [{
        id: 28,
        name: 'Action'
    },
    {
        id: 12,
        name: 'Adventure'
    },
    {
        id: 16,
        name: 'Animation'
    },
    {
        id: 35,
        name: 'Comedy'
    },
    {
        id: 80,
        name: 'Crime'
    },
    {
        id: 99,
        name: 'Documentary'
    },
    {
        id: 18,
        name: 'Drama'
    },
    {
        id: 10751,
        name: 'Family'
    },
    {
        id: 14,
        name: 'Fantasy'
    },
    {
        id: 36,
        name: 'History'
    },
    {
        id: 27,
        name: 'Horror'
    },
    {
        id: 10402,
        name: 'Music'
    },
    {
        id: 9648,
        name: 'Mystery'
    },
    {
        id: 10749,
        name: 'Romance'
    },
    {
        id: 878,
        name: 'Science Fiction'
    },
    {
        id: 10770,
        name: 'TV Movie'
    },
    {
        id: 53,
        name: 'Thriller'
    },
    {
        id: 10752,
        name: 'War'
    },
    {
        id: 37,
        name: 'Western'
    }
]


function getGenres() {
    return fetch(genreUrl, {
        method: 'get',
        agent: new HttpsProxyAgent('http://proxy.intra.bt.com:8080')
    }).then(response => response.json())
}

function getMovieIDs(pageNo) {
    if (pageNo === null || pageNo === undefined)
        pageNo = 1

    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=9eed022e522148efdb5a1fc5d8900333&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pageNo
    console.log("Url: " + url);

    return fetch(url, {
            method: 'get',
            agent: new HttpsProxyAgent('http://proxy.intra.bt.com:8080')
        })
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

function getGenreFromID(id) {
    for (i = 0; i < genres.length; i++) {
        if (genres[i].id === id)
            return genres[i].name
    }
}

console.log(getGenreFromID(37))
movieData = []
// getGenres().then((d) => console.log(d))
data = []

/* getMovieIDs()
    .then(d =>
        fs.writeFileSync('movie.json', JSON.stringify(d, null, 2))) */

getMovieIDs()
    .then(rdata => {
        // console.log(rdata.results.length)

        // var data = []

        for (i = 0; i < rdata.results.length; i++) {
            
            for (j = 0; j < rdata.results[i].genre_ids.length; j++) {
                var genre = [];
                for (k = 0; k < genres.length; k++) {
                    if (genres[k].id === rdata.results[i].genre_ids[j])
                        genre.push(genres[k].name)
                }
                // genre.push(getGenreFromID(rdata.results[i].genre_ids[j]))
            }
            data.push({
                id: rdata.results[i].id,
                release_date: rdata.results[i].release_date,
                synopsis: rdata.results[i].overview,
                img: 'https://image.tmdb.org/t/p/w500' + rdata.results[i].poster_path,
                genres: genre,
                title: rdata.results[i].title
            })
            movieData = movieData.concat(data)
        }
        console.log(data)
    })