import axios from 'axios';

export const fetchMovies = async ({ pageParam = 1, category = 'top_rated' }) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}`, {
            params: {
                api_key: process.env.EXPO_PUBLIC_API_KEY,
                page: pageParam
            }
        });
        const data = response.data;
        return { data: data.results, nextPage: pageParam + 1, totalPages: data.total_pages };
    } catch (error) {
        throw new Error('Failed to fetch movies');
    }
};

export const fetchMovieDetails = async (movieId: string) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
            api_key: process.env.EXPO_PUBLIC_API_KEY,
            append_to_response: 'credits,videos,recommendations'
        }
    });
    return data;
};