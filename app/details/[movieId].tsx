import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppConfig, QKeys, fetchMovieDetails } from "@/api";
import ScreenView from "@/components/Screen";

const MovieDetailScreen = () => {
  const { movieId = "" } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: QKeys.details(movieId as string),
    queryFn: () => fetchMovieDetails(movieId as string),
    enabled: !!movieId,
  });

  return (
    <ScreenView loading={isLoading} error={error?.message}>
      {!!movie?.id && (
        <>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { marginTop: insets.top + 10 }]}
          >
            <Image
              source={{
                uri: "https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767531-1502435.png",
              }}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <ScrollView>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              resizeMode="cover"
              style={styles.poster}
            />
            <View style={styles.content}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.subTitle}>
                {new Date(movie?.release_date).getFullYear()} ·{" "}
                {Math.round(movie.vote_average)} ⭐️
              </Text>
              <Text style={styles.genre}>
                {movie?.genres?.map((genre) => genre.name).join(", ")}
              </Text>
              <Text style={styles.synopsis}>{movie.overview}</Text>
            </View>
          </ScrollView>
        </>
      )}
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    height: AppConfig.height / 2.2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
  },
  subTitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
    marginTop: 5,
  },
  genre: {
    fontSize: 14,
    color: "white",
    marginBottom: 10,
  },
  synopsis: {
    fontSize: 16,
    color: "grey",
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    left: 20,
    position: "absolute",
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    padding: 10,
  },
});

export default MovieDetailScreen;
