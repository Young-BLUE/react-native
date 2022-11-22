const API_KEY = '4d3d9f4a798cd8aaa63dd9b8af42cb25';
const BASE_URL = "https://api.themoviedb.org/3";

export const moviesAPI = {
    trending:() => fetch(
        `${BASE_URL}/movie/trending/movie/week?api_key=${API_KEY}`).then(res => res.json()),
    upcoming:() => fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(res => res.json()),
    nowPlaying:() => fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(res => res.json())};

export const tvApi = {
    trending:() => fetch(
        `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then(res => res.json()),
    airingToday: () => fetch(
        `${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then(res => res.json()),
    topRated: () => fetch(
        `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then(res => res.json()),
}