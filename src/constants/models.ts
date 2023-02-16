export type MovieCardType = {
    id: number;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    overview: string;
    title: string;
};

export type FetchMovieDataType = {
    page: number;
    results: Array<MovieCardType>;
    totalPages: number;
};
