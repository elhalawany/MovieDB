// *************************** بسم الله الرحمن الرحيم ************************** \\
// strict mode
"use strict";

// Tooltip inintialization
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Global Variables goes here
let allFetchedMovies = [];

// feth data from API Url
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// render movies to html
async function renderMovies(p) {
  let data = await fetchData(
    `https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page=${p}`
  );
  //console.log(data.results);
  let movies = data.results;
  let moviesDataContainer = document.querySelector("#movies-data");

  allFetchedMovies.push(...data.results);
  //console.log("allfetched", allFetchedMovies);
  movies.forEach((movie) => {
    let moviesDiv = document.createElement("div");
    moviesDiv.classList.add("col-md-6", "col-lg-4", "my-3");

    moviesDiv.innerHTML = `
            <div class="card shadow-lg border-0 rounded position-relative" style="overflow: hidden;">  
                <img class="img-fluid rounded" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" >
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-0">
                    
                            <h2>${movie.original_title}</h2>
                            <p>${movie.overview}</p>
                            <p>${movie.vote_average}</p>
                            <p>${movie.release_date}</p>
                            
                        </div>
                    </div>
            </div>
        `;
    moviesDataContainer.appendChild(moviesDiv);
  });
}

// render on first load
renderMovies(1);

// load more movies on scroll (infinity scroll)
let counterScroll = 2;
document.addEventListener("scroll", function (e) {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // console.log('scrolled to bottom');
    counterScroll++;
    renderMovies(counterScroll);
  }
});

// dark mode toggle
const darkModeToggle = document.querySelector(".mode-toggle");

darkModeToggle.addEventListener("click", function (e) {
  let element = document.body;
  let layers = document.querySelectorAll(".layer");

  element.classList.toggle("dark-mode");
  for (const layer of layers) {
    layer.classList.toggle("toggle-layer");
  }
});

// search in the page
let loadedMovies = document.querySelector('#loadedMovies');

function renderSearchInCurrentMovies(searchWords) {
  let moviesDataContainer = document.querySelector("#movies-data");

  // empty the content
  moviesDataContainer.innerHTML = ``;

  allFetchedMovies.forEach((movie) => {
    if (`${movie.original_title}`.toLowerCase().includes(searchWords)) {
        
        let moviesDiv = document.createElement("div");
        moviesDiv.classList.add("col-md-6", "col-lg-4", "my-3");

        moviesDiv.innerHTML = `
                <div class="card shadow-lg border-0 rounded position-relative" style="overflow: hidden;">  
                    <img class="img-fluid rounded" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" >
                        <div class="layer d-flex align-items-center ">
                            <div class="info p-0">
                        
                                <h2>${movie.original_title}</h2>
                                <p>${movie.overview}</p>
                                <p>${movie.vote_average}</p>
                                <p>${movie.release_date}</p>
                                
                            </div>
                        </div>
                </div>
            `;
      moviesDataContainer.appendChild(moviesDiv);
    }
  });
}
// input listerner
loadedMovies.addEventListener('keyup', (e) => renderSearchInCurrentMovies(loadedMovies.value))



// search in all movies DB
async function renderAllMoviesSearch(keywords) {
    let data = await fetchData(
      `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false&query=${keywords}`
    );

    console.log(data.results);
    let movies = data.results;
    let moviesDataContainer = document.querySelector("#movies-data");
    moviesDataContainer.innerHTML = ``;
    allFetchedMovies.push(...data.results);
    
    movies.forEach((movie) => {
      let moviesDiv = document.createElement("div");
      moviesDiv.classList.add("col-md-6", "col-lg-4", "my-3");
  
      moviesDiv.innerHTML = `
              <div class="card shadow-lg border-0 rounded position-relative" style="overflow: hidden;">  
                  <img class="img-fluid rounded" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" >
                      <div class="layer d-flex align-items-center ">
                          <div class="info p-0">
                      
                              <h2>${movie.original_title}</h2>
                              <p>${movie.overview}</p>
                              <p>${movie.vote_average}</p>
                              <p>${movie.release_date}</p>
                              
                          </div>
                      </div>
              </div>
          `;
      moviesDataContainer.appendChild(moviesDiv);
    });
  }



let allMovies = document.querySelector('#allMovies');
allMovies.addEventListener('keyup', (e) => renderAllMoviesSearch(allMovies.value))
