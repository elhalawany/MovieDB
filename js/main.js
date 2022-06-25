// *************************** بسم الله الرحمن الرحيم ************************** \\

// Tooltip inintialization
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// feth data from API Url
const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}


// render movies to html 
async function renderMovies(p) {

    let data = await fetchData(`https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page=${p}`);
    //console.log(data.results);
    let movies = data.results;
    let moviesDataContainer = document.querySelector('#movies-data');


    movies.forEach(movie => {
        let moviesDiv = document.createElement('div');
        moviesDiv.classList.add('col-md-6', 'col-lg-4', 'my-3');

        moviesDiv.innerHTML = `
            <div class="card shadow-lg rounded position-relative">  
                <img class="img-fluid rounded" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" >
            </div>
        `;
        moviesDataContainer.appendChild(moviesDiv);
        
    }
    );
};
// render on first load
renderMovies(1);



// load more movies on scroll (infinity scroll)
let counterScroll = 2;
document.addEventListener('scroll', function(e) {

     const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;


    if (scrollTop + clientHeight >= scrollHeight - 5 ) {
        // console.log('scrolled to bottom');
        counterScroll++;
        renderMovies(counterScroll);
    }
    
  });


  // dark mode toggle 
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }