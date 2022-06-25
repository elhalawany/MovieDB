// Tooltip inintialization
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// feth data from API


const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    return data
}

(async function (){
    let data = await fetchData('https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page=2');
    console.log(data.results);
})();   



(async function renderMovies() {

    let data = await fetchData('https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page=1');
    console.log(data.results);
    let movies = data.results;
    let moviesData = document.querySelector('#movies-data');


    movies.forEach(movie => {
        let movieDiv = `
        <div class="col-md-6 col-lg-4 my-3">
            <div class="card shadow-lg rounded position-relative">  
                <img class="img-fluid rounded" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" >
            </div>
        </div>
        `;
        moviesData.innerHTML += movieDiv;
        
    }
    );

})();





