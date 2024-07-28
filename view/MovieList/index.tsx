import { QKeys, fetchMovies } from "@/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

interface Props {
  category: string;
}

const MovieList = ({ category }: Props) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: QKeys.list(category),
      initialPageParam: 1,
      queryFn: ({ pageParam }) => fetchMovies({ pageParam, category }),
      getNextPageParam: (lastPage) =>
        lastPage.nextPage <= lastPage.totalPages
          ? lastPage.nextPage
          : undefined,
    });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data?.pages?.flatMap?.((page) => page.data)}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <View style={{ margin: 10 }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={{ width: 100, height: 150 }}
          />
          <Text>{item.title}</Text>
        </View>
      )}
      keyExtractor={(item) => item?.id?.toString()}
    />
  );
};

export default React.memo(MovieList);
