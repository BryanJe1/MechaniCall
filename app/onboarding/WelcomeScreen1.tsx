import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen1() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <TouchableOpacity 
        className="absolute top-12 right-6 z-10"
        onPress={() => router.push("/auth/LoginScreen")}
      >
        <Text className="text-white font-medium text-base">Skip</Text>
      </TouchableOpacity>
      <View className="flex-1 mt-24">
        <Animated.View 
          className="items-center pb-10"
          entering={FadeInDown.delay(200).springify()}
        >
          <Text className="text-3xl font-bold text-white text-center">
            Vehicle Emergency?
          </Text>
        </Animated.View>
        <Animated.View 
          className="flex-1 bg-white rounded-t-[30px] px-6 items-center"
          entering={FadeInUp.delay(300).springify()}
        >
          <Animated.View 
            className="mt-10 items-center justify-center"
            entering={FadeInDown.delay(400).springify()}
          >
            <Image
              source={require("@/assets/images/Welcome.png")}
              style={{ width: width * 1.3, height: width * 1 }}
              resizeMode="contain"
            />
            <View className="h-0.5 bg-[#D92C2C] -mt-10" style={{ width: width * 0.7 }} />
          </Animated.View>
          <Text className="text-center text-lg text-gray-800 mt-10 mb-10 leading-6">
            Your trusted partner for any{"\n"}roadside emergency. Help is{"\n"}just a few taps away.
          </Text>
          <View className="flex-row gap-x-2 mb-10">
            <View className="w-6 h-2 rounded-full bg-[#D92C2C]" />
            <View className="w-2 h-2 rounded-full bg-gray-200" />
            <View className="w-2 h-2 rounded-full bg-gray-200" />
          </View>
          <TouchableOpacity
            className="bg-[#D92C2C] w-full py-4 rounded-full mb-10 items-center justify-center"
            onPress={() => router.push("/onboarding/WelcomeScreen2")}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-lg">Next</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}