import { MovieCard } from '../constants/interfases';

export function createMovieCard(movieData: MovieCard): HTMLDivElement {
    const divMainEl: HTMLDivElement = document.createElement('div');
    divMainEl.className = 'col-lg-3 col-md-4 col-12 p-2';

    const divCardShadowEl: HTMLDivElement = document.createElement('div');
    divCardShadowEl.className = 'card shadow-sm';
    divCardShadowEl.setAttribute('data-movie-id', `${movieData.id}`);
    divMainEl.appendChild(divCardShadowEl);

    const imageEl: HTMLImageElement = document.createElement('img');
    imageEl.src = movieData.poster_path
        ? `https://image.tmdb.org/t/p/original//${movieData.poster_path}`
        : 'https://docs.google.com/uc?export=download&id=1NXC5ixDnu1u_TzoPbCcpzTNoVu4sf3Ys';

    const svgHeartEl: SVGSVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );
    svgHeartEl.setAttribute('stroke', 'red');
    const fillColor: string = localStorage.getItem(`${movieData.id}`)
        ? 'red'
        : '#ff000078';
    svgHeartEl.setAttribute('fill', fillColor);
    svgHeartEl.setAttribute('width', '50');
    svgHeartEl.setAttribute('height', '50');
    svgHeartEl.setAttribute('class', 'bi bi-heart-fill position-absolute p-2');
    svgHeartEl.setAttribute('viewBox', '0 -2 18 22');
    svgHeartEl.innerHTML =
        '<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>';

    const divCardBodyEl: HTMLDivElement = document.createElement('div');
    divCardBodyEl.className = 'card-body';
    divCardBodyEl.innerHTML = `<p class="card-text truncate">
            ${movieData.overview}</p> <div class="d-flex justify-content-between align-items-center"><small class="text-muted">
            ${movieData.release_date}</small></div>`;

    divCardShadowEl.append(imageEl, svgHeartEl, divCardBodyEl);
    return divMainEl;
}

export function createRandomCard(movieData: MovieCard): HTMLElement {
    const divRandomMovieInfoWrapperEl: HTMLDivElement =
        document.createElement('div');
    divRandomMovieInfoWrapperEl.className = 'row py-lg-5';

    const divRandomMovieInfoEl: HTMLDivElement = document.createElement('div');
    divRandomMovieInfoEl.className = 'col-lg-6 col-md-8 mx-auto';
    divRandomMovieInfoEl.setAttribute('style', 'background-color: #2525254f');
    divRandomMovieInfoEl.innerHTML = `<h1 id="random-movie-name" class="fw-light text-light">
        ${movieData.title}</h1> <p id = "random-movie-description" class="lead text-white" > ${movieData.overview} </p>`;
    divRandomMovieInfoWrapperEl.appendChild(divRandomMovieInfoEl);
    return divRandomMovieInfoWrapperEl;
}

export function createFavMovieCard(movieData: MovieCard): HTMLDivElement {
    const divFavMoviesEl = document.createElement('div');
    divFavMoviesEl.className = 'col-12 p-2';
    const divCardShadowEl = document.createElement('div');
    divCardShadowEl.className = 'card shadow-sm';
    divCardShadowEl.setAttribute('data-movie-id', `${movieData.id}`);
    divFavMoviesEl.appendChild(divCardShadowEl);

    const imageEl: HTMLImageElement = document.createElement('img');
    imageEl.src = `https://image.tmdb.org/t/p/original//${movieData.poster_path}`;

    const svgHeartEl: SVGSVGElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );
    svgHeartEl.setAttribute('stroke', 'red');
    svgHeartEl.setAttribute('fill', 'red');
    svgHeartEl.setAttribute('width', '50');
    svgHeartEl.setAttribute('height', '50');
    svgHeartEl.setAttribute('class', 'bi bi-heart-fill position-absolute p-2');
    svgHeartEl.setAttribute('viewBox', '0 -2 18 22');
    svgHeartEl.innerHTML =
        '<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>';

    const divCardBodyEl: HTMLDivElement = document.createElement('div');
    divCardBodyEl.className = 'card-body';
    divCardBodyEl.innerHTML = `<p class="card-text truncate">
        ${movieData.overview}</p> <div class="d-flex justify-content-between align-items-center"><small class="text-muted">
        ${movieData.release_date}</small></div>`;

    divCardShadowEl.append(imageEl, svgHeartEl, divCardBodyEl);
    return divFavMoviesEl;
}
