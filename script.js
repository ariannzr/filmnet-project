var modal = document.getElementById("myModal");

var btn = document.getElementById("openModal");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
const moviesListEl = document.getElementById("moviesList");
let movies;
fetch("https://moviesapi.codingfront.dev/api/v1/movies")
  .then(function (response) {
    hideLoding();
    return response.json();
  })
  .then(function (json) {
    console.log(json);
    renderList(json.data);
    renderPagination(json.metadata);
  })
  .catch(function (e) {
    console.log(e);
  });

function renderCard(movie) {
  const colEl = document.createElement("div");
  colEl.className = "col";
  const cardEl = document.createElement("div");
  cardEl.className = "card shadow-sm";

  const imgEl = document.createElement("img");
  imgEl.className = "bd-placeholder-img card-img-top";

  imgEl.src = movie.poster;

  const cardBodyEl = document.createElement("div");
  cardBodyEl.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className - "card-title";
  cardTitle.innerHTML = movie.title;
  cardBodyEl.appendChild(cardTitle);

  const cardText = document.createElement("div");
  cardText.className = "card-text";
  cardText.innerHTML = movie.year + " | " + movie.country;
  cardBodyEl.appendChild(cardText);
  cardEl.appendChild(imgEl);
  cardEl.appendChild(cardBodyEl);
  colEl.appendChild(cardEl);
  moviesListEl.appendChild(colEl);
}

function renderList(movies) {
  movies.forEach(function (movie) {
    renderCard(movie);
  });
}

function hideLoding() {
  document.getElementsByClassName("spinner-border")[0].classList.add("d-none");
}

function renderPagination(metadata) {
  const paginationEl = document.getElementsByClassName("pagination")[0];
  for (let idx = 1; idx <= metadata.page_count; idx++) {
    const itemButtonEl = document.createElement("button");
    itemButtonEl.className = "page-link";
    itemButtonEl.innerHTML = idx;
    const itemLiEl = document.createElement("li");
    itemLiEl.className = "page-item";
    itemLiEl.appendChild(itemButtonEl);
    paginationEl.appendChild(itemLiEl);
  }
}
