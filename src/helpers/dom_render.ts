import { mapCards } from '../services/mapper';
import { MovieCardType, FetchMovieDataType } from '../constants/models';
import { getMovie, getMovieById, searchMovie } from '../services/services';
import {
    createMovieCard,
    createFavMovieCard,
    createRandomCard,
} from './dom_creation';

export function renderCards(cards: HTMLDivElement[]): void {
    const filmContainer: HTMLDivElement | null =
        document.querySelector('#film-container');
    const curPage: number = parseInt(
        sessionStorage.getItem('currentPage') as string
    );
    if (filmContainer) {
        if (curPage === 1) {
            filmContainer.innerHTML = '';
        }
        filmContainer.append(...cards);
    }
}

const addRemoveFavMovie = (card: Node) => {
    card.addEventListener('click', (e) => {
        const element = e.currentTarget as SVGElement;
        const cardBlock = element.parentNode as HTMLDivElement;
        const movieId: string = cardBlock.dataset.movieId as string;
        if (localStorage.getItem(movieId)) {
            localStorage.removeItem(movieId);
            element.setAttribute('fill', '#ff000078');
        } else {
            localStorage.setItem(movieId, movieId);
            element.setAttribute('fill', 'red');
        }
        renderFavMoviesCards();
    });
};

export function renderMovies(movies: Array<MovieCardType>): void {
    const mappedCards: Array<MovieCardType> = mapCards(movies);
    const randomDigit: number = Math.round(Math.random() * (20 - 1) + 1);
    renderRandomCard(mappedCards[randomDigit]);
    const movieCards = mappedCards.map((card: MovieCardType) =>
        createMovieCard(card)
    );
    renderCards(movieCards);
    const svgHearts: NodeList = document.querySelectorAll(
        '#film-container svg'
    );
    svgHearts.forEach((card) => addRemoveFavMovie(card));
}

const render404 = () => {
    alert('Nothing Was Find, Please Enter Correct Movie Name.');
};

export async function renderMoviesByCategory(
    category: string,
    page = 1
): Promise<void> {
    const movies: FetchMovieDataType = await getMovie(category, page);
    sessionStorage.setItem('category', category);
    sessionStorage.setItem('currentPage', `${movies.page}`);
    renderMovies(movies.results);
}

export async function renderSearchedMovies(
    movieToSearch: string
): Promise<void> {
    const searchedMovies: FetchMovieDataType = await searchMovie(movieToSearch);
    sessionStorage.setItem('currentPage', `${searchedMovies.page}`);
    sessionStorage.setItem('category', 'movie/search');
    if (searchedMovies.results.length > 0) {
        renderMovies(searchedMovies.results);
    } else {
        render404();
    }
}

export function renderRandomCard(movieData: MovieCardType): void {
    const randomMovieEl: HTMLElement | null =
        document.querySelector('#random-movie');
    if (randomMovieEl) {
        randomMovieEl.innerHTML = '';
    }
    randomMovieEl?.setAttribute('style', 'background-size: cover');
    randomMovieEl?.setAttribute(
        'style',
        `background-size:100% auto; background-position: center; background-image: url("https://image.tmdb.org/t/p/original//${movieData.backdrop_path}");`
    );

    randomMovieEl?.append(createRandomCard(movieData));
}

export async function renderFavMoviesCards(): Promise<void> {
    const divFavMovies: HTMLDivElement | null =
        document.querySelector('#favorite-movies');
    if (divFavMovies) {
        divFavMovies.innerHTML = '';
    }
    for (let i = 0; i < localStorage.length; i++) {
        const movie = await getMovieById(localStorage.key(i) as string);
        const vafMovieCard = createFavMovieCard(movie);
        divFavMovies?.appendChild(vafMovieCard);
    }
    const svgHearts: NodeList = document.querySelectorAll(
        '#favorite-movies svg'
    );
    svgHearts.forEach((card) => addRemoveFavMovie(card));
}
