import { API_KEY, BASE_API_URL } from '../constants/constants';

export async function getData<T>(url = '', page: number): Promise<T> {
    const response = await fetch(
        `${BASE_API_URL}${url}?api_key=${API_KEY}&language=en-US&page=${page}`,
        {
            method: 'GET',
        }
    );
    return await response.json();
}

export async function searchData<T>(
    url = '',
    searchString: string,
    page: number
): Promise<T> {
    const response = await fetch(
        `${BASE_API_URL}${url}?api_key=${API_KEY}&language=en-US&query=${searchString}&page=${page}`,
        {
            method: 'GET',
        }
    );
    return await response.json();
}

export async function getDataById<T>(url = '', id: string): Promise<T> {
    const response = await fetch(
        `${BASE_API_URL}${url}${id}?api_key=${API_KEY}&language=en-US`,
        {
            method: 'GET',
        }
    );
    return await response.json();
}
