import { View, Text, ViewStyle, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  loading?: boolean;
  error?: any;
  children: React.ReactNode;
  style?: ViewStyle;
}

const ScreenView = ({ loading, error, children, style }: Props) => {
  const message = typeof error == "string" ? error : error?.message;

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: "#101330",
        },
        style,
      ]}
    >
      {loading && <ActivityIndicator size="large" color="#fff" />}
      {error && <Text>Error: {message || "Something went wrong"}</Text>}
      {!loading && !error && children}
    </View>
  );
};

export default ScreenView;
