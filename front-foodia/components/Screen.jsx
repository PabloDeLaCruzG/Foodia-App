import { View } from "react-native";

export function Screen({ children, className }) {
  return (
    <View className={`flex-1 bg-bgApp pt-4 px-4 ${className}`}>{children}</View>
  );
}
