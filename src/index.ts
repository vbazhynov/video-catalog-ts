import { API_ACTIONS } from './constants/constants';
import {
    renderMoviesByCategory,
    renderSearchedMovies,
    renderFavMoviesCards,
} from './helpers/dom_render';

export async function render(): Promise<void> {
    renderMoviesByCategory(API_ACTIONS.POPULAR);

    const button_type_of_movie = document.querySelector('#button-wrapper');
    button_type_of_movie?.addEventListener('click', (e) => {
        const eventType = e.target as HTMLInputElement;
        if (eventType) {
            switch (eventType.id) {
                case 'popular': {
                    renderMoviesByCategory(API_ACTIONS.POPULAR);
                    break;
                }
                case 'top_rated': {
                    renderMoviesByCategory(API_ACTIONS.TOP_RATED);
                    break;
                }
                case 'upcoming': {
                    renderMoviesByCategory(API_ACTIONS.UPCOMING);
                    break;
                }
            }
        }
    });

    const searchForm: HTMLFormElement | null = document.querySelector('form');
    searchForm?.addEventListener('submit', () => {
        const formData = new FormData(searchForm);
        const text = formData.get('form-input') as string;
        if (text) {
            renderSearchedMovies(text);
        } else {
            alert('Search Field Is Empty, Please Fill It!');
        }
    });

    const favMoviesBtn: HTMLButtonElement | null =
        document.querySelector('.navbar-toggler');
    if (favMoviesBtn) {
        favMoviesBtn.addEventListener('click', () => {
            console.log(process.env);

            renderFavMoviesCards();
        });
    }

    const loadMoreBtn: HTMLButtonElement | null =
        document.querySelector('#load-more');
    loadMoreBtn?.addEventListener('click', () => {
        const currPage = parseInt(
            sessionStorage.getItem('currentPage') as string
        );
        const category = sessionStorage.getItem('category');

        switch (category) {
            case 'movie/popular': {
                renderMoviesByCategory(API_ACTIONS.POPULAR, currPage + 1);
                sessionStorage.getItem('currentPage');
                break;
            }
            case 'movie/top_rated': {
                renderMoviesByCategory(API_ACTIONS.TOP_RATED, currPage + 1);

                break;
            }
            case 'movie/upcoming': {
                renderMoviesByCategory(API_ACTIONS.UPCOMING, currPage + 1);
                break;
            }
            case 'movie/search': {
                renderMoviesByCategory(API_ACTIONS.UPCOMING, currPage + 1);
                break;
            }
        }
    });
}
