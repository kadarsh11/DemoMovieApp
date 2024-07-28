import { QueryClient } from "@tanstack/react-query";
import { Dimensions } from "react-native";

export const queryClient = new QueryClient();

export const QKeys = {
    movies: "movies",
    details: (movieId: string) => ["movies", 'details', movieId],
    list: (category: string) => ["movies", "list", category],
}

export const MovieCategories = {
    now_playing: "now_playing",
    popular: "popular",
    top_rated: "top_rated",
    upcoming: "upcoming",
}

export const AppConfig = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
}