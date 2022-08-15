function main (container, seats, movieSelect, count, total) {
    const seatsArr = Array.from(seats);
    const occupiedClass = "occupied";
    const selectedClass = "selected";
    const LOCAL_STORAGE_KEY = 'movie';

    const cinemaState = {
        currentMovie: 0,
        movies: [
            {
                movieName: `Avengers: Endgame ($10)`,
                moviePrice: `10`,
                occupiedSeats: [4,5,6,7],
                selectedSeats: []
                
            }, {
                movieName: `Joker ($12)`,
                moviePrice: `12`,
                occupiedSeats: [14,37,3,8],
                selectedSeats: []
            }, {
                movieName: `Toy Story 4 ($8)`,
                moviePrice: `8`,
                occupiedSeats: [17,3,6],
                selectedSeats: []
            }, {
                movieName: `The Lion King ($9)`,
                moviePrice: `9`,
                occupiedSeats: [22,13,42],
                selectedSeats: []
            },
        ],
        get currentMovieState() {
            return this.movies[this.currentMovie]
        }
    };

    function updateMovie() {
        const newStateLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
        
        const newState = newStateLocal && JSON.parse(newStateLocal) || cinemaState;

        cinemaState.currentMovie = newState.currentMovie || 0;
        cinemaState.movies = newState.movies || cinemaState.movies;

        movieSelect.value = cinemaState.currentMovie;
    }


    function updateTotal () {
        const {
             currentMovieState: {
                selectedSeats: {
                    length: currenCount,
                },
                moviePrice,
             },
        } = cinemaState;
        total.innerText = `${moviePrice * currenCount}`;
        count.innerText = `${currenCount}`;
    }

    function updateSeats() {
    
        seatsArr.forEach((el) => {
            el.classList.remove(occupiedClass);
            el.classList.remove(selectedClass)
        });

        cinemaState.currentMovieState.occupiedSeats.forEach((el) => {
            seatsArr[el].classList.add(occupiedClass)
        })
        cinemaState.currentMovieState.selectedSeats.forEach((el) => {
            seatsArr[el].classList.add(selectedClass)
        })
    };

    function saveState () {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cinemaState));
    }

    function changeMovie(e) {
        cinemaState.currentMovie = e.target.value;
        saveState();
        updateSeats();
        updateTotal();
        updateMovie();
    }

    function chooseSet(seat) {
        if(!seat.classList.contains(occupiedClass)){
            const { id } = seat.dataset;
            if(seat.classList.contains(selectedClass)){
                seat.classList.remove(selectedClass);
                cinemaState.currentMovieState.selectedSeats = cinemaState.currentMovieState.selectedSeats.filter(el => el !== id);
            } else {
                seat.classList.add(selectedClass);
                cinemaState.currentMovieState.selectedSeats.push(id);
            }

            saveState();
        }
    }

    function selectSeat(e, seat) {
        chooseSet(e.target)
        updateTotal();
    }
    
    seatsArr.forEach((el) => {
        el.addEventListener("click", selectSeat);
    });

    movieSelect.addEventListener("change", changeMovie);

    updateMovie();
    updateTotal();
    updateSeats();
}

const container = document.querySelector(".container");
const seats = container.querySelectorAll(".seat");
const movieSelect = document.getElementById("movie");
const count = document.getElementById("count");
const total = document.getElementById("total");

main(container, seats, movieSelect, count, total);
