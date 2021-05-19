const { response } = require("express");
const http = require("https");
const express = require("express");
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
var movies = [];

var accountSelected = {
  account: "75632",
  corporation: "Banco del Austro",
};

app.listen(4000, () => {
  console.log("server on port 4000");
});
app.get("/movies", (req, res) => {
  const options = {
    method: "GET",
    hostname: "api.themoviedb.org",
    port: null,
    path: "/3/movie/now_playing?api_key=c6935128550a01ae867fce61da145ad2",
  };
  const reque = http.request(options, function (ress) {
    const chunks = [];

    ress.on("data", function (chunk) {
      chunks.push(chunk);
    });

    ress.on("end", function () {
      const body = Buffer.concat(chunks);
      //  console.log(body.toString());
      movies = JSON.parse(body).results;
      movies = movies.map((res) => {
        return {
          price: Math.floor(Math.random() * (20 - 5)) + 5,
          id: res.id,
          original_title: res.original_title,
          poster_path: res.poster_path,
          overview: res.overview,
          pay_detail: accountSelected,
        };
      });
      //console.log("data movies", movies)
      return res.send(movies);
    });
  });

  reque.end();
});
app.get("/movies/:id", (req, res) => {
  //console.log("params", req.params.id)
  let movie = movies.find((movie) => movie.id == req.params.id);
  if (movie) {
    return res.send(movie);
  } else {
    return res.status(404).send({ message: "the movie does not exist" });
  }
});

app.post("/change-account", (req, res) => {
  //console.log(req.body)
  accountSelected = req.body;
  return res.send({
    status: "ok",
    message: "The account has been successfully changed",
    account: accountSelected
  });
});

app.get("/get-account", (req, res) => {
  //console.log(req.body)
  return res.send(accountSelected);
});

