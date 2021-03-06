// document.domain = 'movie-bloom.com'
PageNo = 1;
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

function getMovieIDs(pageNo) {
    if (pageNo === null || pageNo === undefined)
        pageNo = 1

    const url =
        // 'https://api.themoviedb.org/3/discover/movie?api_key=9eed022e522148efdb5a1fc5d8900333&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' +
        'https://api.themoviedb.org/3/movie/now_playing?api_key=9eed022e522148efdb5a1fc5d8900333&language=en-US&page=' +
        pageNo
    console.log("Url: " + url);

    return fetch(url, {
            method: 'get',
            // agent: new HttpsProxyAgent('http://proxy.intra.bt.com:8080')
        })
        .then(response => response.json())

}
var data = []

test = []

function loadMovies(pageNo) {
    getMovieIDs(pageNo)
        .then(rdata => {
            // console.log(rdata.results.length)

            // var data = []
            data = []
            for (i = 0; i < rdata.results.length; i++) {
                var genre = [];
                for (j = 0; j < rdata.results[i].genre_ids.length; j++) {

                    for (k = 0; k < genres.length; k++) {
                        if (genres[k].id === rdata.results[i].genre_ids[j])
                            genre.push(' ' + genres[k].name)
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
                // movieData = movieData.concat(data)
            }
            var html = '';
            for (i = 0; i < data.length; i++) {
                html = html + createMoviecontainer(data[i].title, data[i].img, data[i].release_date,
                    data[i]
                    .synopsis, data[i].genres, data[i].id)
                document.getElementById('movies-container').innerHTML = html
                // loadChart('canvas-' + data[i].id)
            }
            // console.log(data)
        })
        .then(() => {

            jsonRead(function (ratingData) {
                // uniqueRatingID = [], consolidated = [], ratings = []
                // for (r = 0; r < ratingData.length; r++) {
                //     uniqueRatingID[r] = ratingData[r].id
                // }
                // uniqueRatingID = _.uniq(uniqueRatingID)

                // for (k = 0; k < uniqueRatingID.length; k++) {
                //     for (r = 0; r < ratingData.length; r++) {
                //         if (ratingData[r].id === uniqueRatingID[k]) {
                //             for (j = 0; j < labels.length; j++) {

                //                 ratings[j] += parseInt(ratingData[r].rating[labels[j]])
                //             }
                //         }
                //     }
                // }
                avg_rating = averageRatings(ratingData)

                for (i = 0; i < data.length; i++) {
                    // fetchGraphData(data[i].id, function (ratings) {
                    //     test = ratings;
                    //     loadChart('canvas-' + data[i].id, ratings)

                    // })
                    ratings = []
                    t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    loadChart('canvas-' + data[i].id, t)

                    for (r = 0; r < avg_rating.length; r++) {
                        if (data[i].id === avg_rating[r].id) {

                            // for (j = 0; j < labels.length; j++) {

                            //     ratings[j] = parseInt(ratingData[r].rating[labels[j]])
                            // }
                            loadChart('canvas-' + data[i].id, avg_rating[r].total_rating)
                        }
                    }

                }
            })

        })
}


function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function () {
        return Math.round(Math.random() *
            max);
    });
}

function createMoviecontainer(title, img, release_date, synopsis, genre, id) {

    html = '<div class="row" style="padding: 15px">' +
        '<p class="h2" style="padding: 15px">' + title + '</p>' +
        '<div class="row" style="padding: 15px">' +
        '<div class="col">' +

        '<img src="' + img +
        '" class="img-fluid rounded float-left " style="width: 100%" alt="Responsive image">' +
        '</div>' +
        '<div class="col">' +
        '<p class="h2"> </p>' +
        '<p></p>' +
        '<div id="chart-container-' + id + '"><canvas id="canvas-' + id + '"></canvas></div>' +
        '<p>Release Date: ' + release_date + '</p>' +

        '<p>Originally billed as: ' + genre + '</p>' +
        '<button type="button" class="btn btn-success bloom-button" id="btn-' + id + '" onclick="getSurvey(' +
        id +
        ')">Rate it!</button>' +
        '<p></p>' +
        '<p class="h4">SYNOPSIS</p>' +
        '<p>' + synopsis + '</p>' +
        '</div></div>' +
        '</div>'
    return html
}

function loadChart(ctxID, data) {

    var ctx = document.getElementById(ctxID).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: ["Action", "Adventure", "Suspense", "Mystery", "Drama", "Horror", "Romance",
                "Comedy", "Science Fiction", "Fantasy"
            ],
            datasets: [{
                label: "Rating",
                backgroundColor: 'rgba(127, 195, 48, 1)',
                borderColor: 'rgba(127, 195, 48, 1)',
                data: data,
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            },
            scales: {

                xAxes: [{

                    ticks: {
                        min: 0,
                        max: 10,
                        stepSize: 1
                    }
                }]
            }
        }
    });
    chart.update()
}


function updatePageCharts() {
    jsonRead(function (ratingData) {

        avg_rating = averageRatings(ratingData)

        for (i = 0; i < data.length; i++) {
            // fetchGraphData(data[i].id, function (ratings) {
            //     test = ratings;
            //     loadChart('canvas-' + data[i].id, ratings)

            // })
            ratings = []
            t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            loadChart('canvas-' + data[i].id, t)

            for (r = 0; r < avg_rating.length; r++) {
                if (data[i].id === avg_rating[r].id) {

                    // for (j = 0; j < labels.length; j++) {

                    //     ratings[j] = parseInt(ratingData[r].rating[labels[j]])
                    // }
                    loadChart('canvas-' + data[i].id, avg_rating[r].total_rating)
                }
            }

        }
    })
}

function nextPage() {
    PageNo = PageNo + 1

    loadMovies(PageNo)
    window.top.scrollTo(0, 0)
}

function prevPage() {
    if (PageNo !== 1) {
        PageNo = PageNo - 1
        loadMovies(PageNo)
        window.scrollTo(0, 0)
    }
}
labels = ["Action", "Adventure", "Suspense", "Mystery", "Drama", "Horror", "Romance", "Comedy",
    "Science-Fiction",
    "Fantasy"
]

function loadQuestions() {
    // labels = ["Action", "Adventure", "Suspense", "Mystery", "Drama", "Horror", "Romance", "Comedy",
    //     "Science Fiction",
    //     "Fantasy"
    // ]
    html = ''
    for (i = 0; i < labels.length; i++) {
        html +=
            '<label for="">' + (i + 1) + '. How much ' + labels[i] + ' was in the movie?</label>'

        buttons = '<div class="btn-group btn-group-toggle" data-toggle="buttons">'
        for (j = 0; j < 11; j++) {
            buttons +=
                '<label class="btn btn-secondary">' +
                '<input type="radio" name="' + labels[i] + '-options" id="option" autocomplete="off" value="' +
                j + '">' + j +
                '</label>'

        }
        html += buttons + '</div>'
    }
    // document.getElementById('survey-questions').innerHTML = html
    $('#survey-questions').html(html)
}

function getSurvey(id) {
    // console.log(id)
    idx = data.findIndex(x => x.id === id)
    loadSurvey(data[idx].title, data[idx].img)
    /* for (i = 0; i < labels.length; i++) {
        ratingOption = labels[i] + '-options'
        if ($("input[name='" + ratingOption + "']:checked").val())
        {
            document.getElementById("submit-rating").disabled = false
            // rating[labels[i]] = 0
        } else {
            document.getElementById("submit-rating").disabled = true
        }
    } */
    $('#submit-rating').on('click', function () {

        submitSurvey(id, data[idx].title)
        $('#survey-modal').modal('hide')
    })

}

function submitSurvey(id, title) {
    jsonData = [], rating = {};
    for (i = 0; i < labels.length; i++) {
        ratingOption = labels[i] + '-options'
        if ($("input[name='" + ratingOption + "']:checked").val())
            rating[labels[i]] = parseInt($("input[name='" + ratingOption + "']:checked").val())
        else {

            // rating[labels[i]] = 0
        }
    }

    jsonData.push({
        id: id,
        title: title,
        rating: rating,
        // count:count+1
    })
    console.log(jsonData)
    jsonUpdate(jsonData, function () {
        // window.location.reload(true)
        // window.location = window.location;
        window.parent.location.reload();
        window.parent.location = document.referrer
        window.parent.postMessage('reloadNow', '*');
        updatePageCharts()

    })
}

function jsonUpdate(bin, callback) {
    $.ajax({
        url: jsonURL + '/latest',
        type: 'GET',
        /* headers: { //Required only if you are trying to access a private bin
            'secret-key': < SECRET_KEY >
        }, */
        success: (data) => {
            console.log(data);
            // bin = bin.concat(data)
            for (i = 0; i < data.length; i++) {
                if (data[i].id === bin.id) {
                    for (j = 0; j < labels.length; j++) {
                        // bin.rating[labels[j]] = (bin.rating[labels[j]] + data[i].rating[labels[j]]) /2
                        data[i].rating[labels[j]] = (data[i].rating[labels[j]] + bin.rating[labels[
                            j]]) / 2
                    }
                } else {
                    data = data.concat(bin)
                    break
                }
            }
            $.ajax({
                url: jsonURL,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => {
                    console.log(data);
                    callback()
                },
                error: (err) => {
                    console.log(err.responseJSON);
                }
            });
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });





}

function jsonRead(callback) {
    $.ajax({
        url: jsonURL + '/latest',
        type: 'GET',
        /* headers: { //Required only if you are trying to access a private bin
            'secret-key': < SECRET_KEY >
        }, */
        success: (data) => {
            console.log(data);
            callback(data)
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

function jsonCreate(bin) {
    // jsonURL = 'https://www.jsonstore.io/b238546ade77ea0bda3136799337a73f1f5557716cd7fe9f067ee08afa790727'
    $.ajax({
        url: 'https://api.jsonbin.io/b',
        type: 'POST',
        contentType: 'application/json',

        /* headers required ONLY if you are creating a private bin or you want to create a public bin
        and also list the same in your account by passing private: false */
        headers: {
            'secret-key': '$2a$10$/cyf55XhoUIUl77CfyiUWOb/vbr76Ef4ZmTP7V7RcBhq/HQzXH8MO',
            'private': false,
            // 'collection-id': < COLLECTION_ID >
        },
        data: JSON.stringify(bin),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}
jsonURL = 'https://api.jsonbin.io/b/5b3d1891dd2c022ecd9ed9a5'

function fetchGraphData(id, callback) {
    ratings = []
    t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    jsonRead(function (data) {
        for (i = 0; i < data.length; i++) {

            if (data[i].id === id) {

                for (j = 0; j < labels.length; j++) {

                    ratings[j] = parseInt(data[i].rating[labels[j]])
                }

            }

        }

        // console.log(JSON.stringify(ratings))
        callback(ratings)
    })
}

function averageRatings(data) {

    ids = []
    for (i = 0; i < data.length; i++) {
        ids[i] = data[i].id
    }

    uids = _.uniq(ids)
    fdata = []



    for (i = 0; i < uids.length; i++) {
        t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // console.log('id = ' + uids[i])
        n = 0
        for (j = 0; j < data.length; j++) {

            // console.log('data index = ' + j + ' data id = ' + data[j].id)
            if (data[j].id === uids[i]) {
                n++
                // console.log('id matched for ' + data[j].id)
                for (l = 0; l < labels.length; l++) {

                    t[l] += data[j].rating[labels[l]]

                }
                // console.log(n, t)
            }

        }

        for (k = 0; k < t.length; k++) {
            if (n > 0)
                t[k] = (t[k] / (n)).toFixed(2) * 1
        }
        fdata.push({
            id: uids[i],
            total_rating: t
        })
    }
    return fdata
}

function enableSurveySubmit() {
    for (i = 0; i < labels.length; i++) {
        ratingOption = labels[i] + '-options'
        if ($("input[name='" + ratingOption + "']:checked").val()) {
            document.getElementById("submit-rating").disabled = false
            // rating[labels[i]] = 0
        } else {
            document.getElementById("submit-rating").disabled = true
        }
    }
}

function loadSurvey(title, img) {
    document.getElementById("submit-rating").disabled = true
    loadQuestions()
    $('#survey-movie-title').text(title)
    $('#survey-movie-poster').attr('src', img)
    $('#survey-modal').modal('show')
}

$(document).ready(function () {
    loadMovies(PageNo)

    document.getElementById('survey-modal').addEventListener('mousemove', enableSurveySubmit)

    // test modal location code
    $('[id^=btn-]').on('mousedown', function (event) {
        // event.preventDefault();
        $('#survey-modal').data('y', event.pageY); // store the mouseY position
        $('#survey-modal').modal('show');
    });
    $('#survey-modal').on('show.bs.modal', function (e) {
        var y = $('#survey-modal').data('y'); // gets the mouseY position
        console.log('y pos: ' + y)
        $('#survey-modal').css('top', y);
    });
});