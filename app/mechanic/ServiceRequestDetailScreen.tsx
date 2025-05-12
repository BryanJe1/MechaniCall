import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceRequestDetailScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg">Screen Name: Service Request Detail Screen</Text>
      </View>
    </SafeAreaView>
  );
}
