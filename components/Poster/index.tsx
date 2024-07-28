import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { IMovie } from "@/types";
import { Image } from "expo-image";
import { AppConfig } from "@/api";

const Poster = ({
  movie,
  onPress,
}: {
  movie: IMovie;
  onPress: PressableProps["onPress"];
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.poster}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.title}>
            {movie.title}
          </Text>
          <View style={styles.details}>
            <Text style={styles.releaseDate}>
              {new Date(movie.release_date).getFullYear()}
            </Text>
            <Text style={styles.rating}>
              ⭐️({Math.round(movie.vote_average)})
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    maxWidth: AppConfig.width / 2,
  },
  poster: {
    width: AppConfig.width * 0.4,
    aspectRatio: 2 / 3,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "white",
  },
  image: {
    flex: 1,
  },
  info: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    color: "white",
  },
  details: {
    flexDirection: "row",
    marginTop: 2,
    justifyContent: "space-between",
  },
  releaseDate: {
    color: "red",
  },
  rating: {
    color: "white",
  },
});

export default Poster;
