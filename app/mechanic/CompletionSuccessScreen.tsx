import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CompletionSuccessScreen() {
  const router = useRouter();
  const { id, total } = useLocalSearchParams();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Animated.View 
        className="flex-1 justify-center items-center px-6"
        entering={FadeIn.delay(300).duration(1000)}
      >
        <View className="bg-green-100 p-6 rounded-full mb-6">
          <Feather name="check" size={60} color="#10B981" />
        </View>
        <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
          Service Completed!
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          You have successfully completed this service request.
        </Text>
        <View className="bg-gray-50 w-full rounded-xl p-4 mb-8">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Service ID:</Text>
            <Text className="font-medium text-gray-800">#{id}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Date:</Text>
            <Text className="font-medium text-gray-800">{new Date().toLocaleDateString()}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Amount:</Text>
            <Text className="font-bold text-[#D92C2C]">₱{total}</Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-[#D92C2C] rounded-full py-4 px-8 mb-4"
          onPress={() => router.push("/mechanic/MechanicDashboard")}
        >
          <Text className="text-white font-bold text-lg">Back to Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-2"
          onPress={() => router.push("/mechanic/EarningSummaryScreen")}
        >
          <Text className="text-[#D92C2C] font-medium">View Earnings</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}