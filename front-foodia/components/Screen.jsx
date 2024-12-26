import { View } from "react-native";

export function Screen({ children, className }) {
  return (
    <View className={`flex-1 bg-bgApp pt-4 px-2 ${className}`}>{children}</View>
  );
}
