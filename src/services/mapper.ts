import { MovieCardType } from '../constants/models';
export function mapCards(movies: Array<MovieCardType>): MovieCardType[] {
    return movies.map((movie: MovieCardType) => mapper(movie));
}

export function mapper(movieObj: MovieCardType) {
    const card: MovieCardType = {
        id: movieObj.id,
        poster_path: movieObj.poster_path,
        backdrop_path: movieObj.backdrop_path,
        release_date: movieObj.release_date,
        overview: movieObj.overview,
        title: movieObj.title,
    };
    return card;
}
