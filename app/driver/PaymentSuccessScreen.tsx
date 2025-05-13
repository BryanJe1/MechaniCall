import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const { amount } = useLocalSearchParams();
  
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
          Payment Successful!
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Your payment of ₱{amount} has been processed successfully.
        </Text>
        <View className="bg-gray-50 w-full rounded-xl p-4 mb-8">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Amount:</Text>
            <Text className="font-bold text-gray-800">₱{amount}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Date:</Text>
            <Text className="font-medium text-gray-800">{new Date().toLocaleDateString()}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Payment Method:</Text>
            <Text className="font-medium text-gray-800">Credit Card (****4567)</Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-[#D92C2C] rounded-full py-4 px-8 mb-4 w-full items-center"
          onPress={() => router.push({ pathname: "/driver/RatingScreen", params: { id: 1 } })}
        >
          <Text className="text-white font-bold text-lg">Rate Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-2"
          onPress={() => router.push("/driver/DriverDashboard")}
        >
          <Text className="text-[#D92C2C] font-medium">Back to Dashboard</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}