import { AppConfig, MovieCategories } from "@/api";
import MovieList from "@/view/MovieList";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";

const initialLayout = { width: AppConfig.width };

const renderScene = SceneMap({
  now_playing: () => <MovieList category={MovieCategories.now_playing} />,
  popular: () => <MovieList category={MovieCategories.popular} />,
  top_rated: () => <MovieList category={MovieCategories.top_rated} />,
  upcoming: () => <MovieList category={MovieCategories.upcoming} />,
});

export default function HomeScreen() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <TabView
          navigationState={{
            index,
            routes: [
              { key: "now_playing", title: "Now Playing" },
              { key: "popular", title: "Popular" },
              { key: "top_rated", title: "Top Rated" },
              { key: "upcoming", title: "Upcoming" },
            ],
          }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    </>
  );
}
