import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RatingSuccessScreen() {
  const router = useRouter();
  const { rating } = useLocalSearchParams();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Animated.View 
        className="flex-1 justify-center items-center px-6"
        entering={FadeIn.delay(300).duration(1000)}
      >
        <View className="bg-[#D92C2C]/10 p-6 rounded-full mb-6">
          <Feather name="star" size={60} color="#D92C2C" />
        </View>
        <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
          Thanks for Your Feedback!
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Your {rating}-star rating helps us improve our service.
        </Text>
        <View className="flex-row mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <Feather 
              key={star}
              name="star" 
              size={32} 
              color={star <= parseInt(Array.isArray(rating) ? rating[0] : rating) ? "#F59E0B" : "#E5E7EB"} 
              style={{ marginHorizontal: 4 }}
            />
          ))}
        </View>
        <TouchableOpacity
          className="bg-[#D92C2C] rounded-full py-4 px-8 mb-4 w-full items-center"
          onPress={() => router.push("/driver/DriverDashboard")}
        >
          <Text className="text-white font-bold text-lg">Back to Dashboard</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}