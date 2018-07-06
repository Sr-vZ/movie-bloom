const _ = require('lodash')

data = [{
    "rating": {
      "Fantasy": 4,
      "Science-Fiction": 4,
      "Comedy": 4,
      "Romance": 4,
      "Horror": 4,
      "Drama": 4,
      "Mystery": 4,
      "Suspense": 4,
      "Adventure": 4,
      "Action": 4
    },
    "id": 260513
  },
  {
    "id": 260513,
    "rating": {
      "Action": 4,
      "Adventure": 4,
      "Suspense": 4,
      "Mystery": 4,
      "Drama": 4,
      "Horror": 4,
      "Romance": 4,
      "Comedy": 4,
      "Science-Fiction": 4,
      "Fantasy": 4
    }
  },
  {
    "rating": {
      "Fantasy": 8,
      "Science-Fiction": 8,
      "Comedy": 8,
      "Romance": 8,
      "Horror": 8,
      "Drama": 8,
      "Mystery": 8,
      "Suspense": 8,
      "Adventure": 8,
      "Action": 8
    },
    "id": 260513
  },
  {
    "id": 351286,
    "rating": {
      "Action": 8,
      "Adventure": 8,
      "Suspense": 6,
      "Mystery": 0,
      "Drama": 8,
      "Horror": 6,
      "Romance": 0,
      "Comedy": 8,
      "Science-Fiction": 7,
      "Fantasy": 5
    }
  },
  {
    "rating": {
      "Fantasy": 9,
      "Science-Fiction": 8,
      "Comedy": 8,
      "Romance": 0,
      "Horror": 10,
      "Drama": 8,
      "Mystery": 7,
      "Suspense": 8,
      "Adventure": 8,
      "Action": 9
    },
    "id": 284053
  },
  {
    "id": 284053,
    "rating": {
      "Action": 9,
      "Adventure": 8,
      "Suspense": 8,
      "Mystery": 7,
      "Drama": 8,
      "Horror": 10,
      "Romance": 0,
      "Comedy": 8,
      "Science-Fiction": 8,
      "Fantasy": 9
    }
  },
  {
    "rating": {
      "Fantasy": 7,
      "Science-Fiction": 8,
      "Comedy": 7,
      "Romance": 0,
      "Horror": 8,
      "Drama": 7,
      "Mystery": 7,
      "Suspense": 7,
      "Adventure": 9,
      "Action": 9
    },
    "id": 427641
  },
  {
    "rating": {
      "Fantasy": 8,
      "Science-Fiction": 8,
      "Comedy": 8,
      "Romance": 6,
      "Horror": 8,
      "Drama": 6,
      "Mystery": 8,
      "Suspense": 8,
      "Adventure": 7,
      "Action": 8
    },
    "id": 284053
  }
]

labels = ["Action", "Adventure", "Suspense", "Mystery", "Drama", "Horror", "Romance", "Comedy",
  "Science-Fiction",
  "Fantasy"
]

ids = []
for (i = 0; i < data.length; i++) {
  ids[i] = data[i].id
}

uids = _.uniq(ids)
fdata = []

console.log(data[0].rating.Action)
console.log(uids)

for (i = 0; i < uids.length; i++) {
  t = [0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0]
  console.log('id = ' + uids[i])
  n = 0
  for (j = 0; j < data.length; j++) {

    console.log('data index = ' + j + ' data id = ' + data[j].id)
    if (data[j].id === uids[i]) {
      n++
      console.log('id matched for ' + data[j].id)
      for (l = 0; l < labels.length; l++) {

        t[l] += data[j].rating[labels[l]]

      }
      console.log(n, t)
    }

  }

  for (k = 0; k < t.length; k++) {
    if (n > 0)
      t[k] = (t[k] / (n)).toFixed(2)*1
  }
  fdata.push({
    id: uids[i],
    total_rating: t
  })
}

console.log(fdata)