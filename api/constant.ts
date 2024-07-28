import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const QKeys = {
    movies: "movies",
    list: (category: string) => ["movies", "list", category],
}

export const MovieCategories = {
    now_playing: "now_playing",
    popular: "popular",
    top_rated: "top_rated",
    upcoming: "upcoming",
}