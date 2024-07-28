import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();


export const QKeys = {
    movies: "movies",
    list: ["movies", "list"],
}