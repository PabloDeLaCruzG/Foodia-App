import React from "react";
import { Modal, View, ActivityIndicator, Text } from "react-native";

export default function LoadingModal({ visible }) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg items-center">
          <ActivityIndicator size="large" color="orange" />
          <Text className="mt-4 text-lg font-bold text-dark">
            Generando receta...
          </Text>
        </View>
      </View>
    </Modal>
  );
}
