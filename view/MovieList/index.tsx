import { QKeys, fetchMovies } from "@/api";
import Poster from "@/components/Poster";
import { IMovie } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, ListRenderItemInfo, Text } from "react-native";

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

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IMovie>) => {
    return (
      <Poster
        movie={item}
        onPress={() => {
          router.push(`/details/${item.id}`);
        }}
      />
    );
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data?.pages?.flatMap?.((page) => page.data)}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={(item) => item?.id?.toString()}
    />
  );
};

export default React.memo(MovieList);
