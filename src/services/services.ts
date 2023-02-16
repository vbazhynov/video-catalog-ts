import { FetchMovieDataType, MovieCardType } from '../constants/models';
import { getData, searchData, getDataById } from '../helpers/api';
import { API_ACTIONS } from '../constants/constants';

export async function getMovie(
    category: string,
    page: number
): Promise<FetchMovieDataType> {
    const movies: FetchMovieDataType = await getData(category, page);
    return movies;
}

export async function searchMovie(
    text: string,
    page = 1
): Promise<FetchMovieDataType> {
    const movies: FetchMovieDataType = await searchData(
        API_ACTIONS.SEARCH_MOVIE,
        text,
        page
    );
    return movies;
}

export async function getMovieById(id: string): Promise<MovieCardType> {
    const movie: MovieCardType = await getDataById(API_ACTIONS.MOVIE_BY_ID, id);
    return movie;
}
