import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Success", 
        "Password reset link has been sent to your email",
        [{ text: "OK", onPress: () => router.replace("/auth/LoginScreen") }]
      );
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="pt-10 pb-6 px-6">
        <TouchableOpacity 
          className="absolute top-10 left-6 z-10"
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          <Text className="text-white text-3xl font-bold">Forgot Password</Text>
          <Text className="text-white/80 text-base mt-2 text-center">
            Enter your email to receive{"\n"}password reset link
          </Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px] px-6 pt-8"
        entering={FadeInUp.delay(300).springify()}
      >
        <View className="items-center mb-8">
          <View className="w-16 h-1 bg-gray-200 rounded-full mb-8" />
          <View className="items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <View className="w-10 h-10 items-center justify-center">
              <Feather name="key" size={28} color="#D92C2C" />
            </View>
          </View>
          <Text className="text-gray-600 text-center mb-4">
            Don't worry! It happens to the best of us.
          </Text>
        </View>
        <Animated.View 
          className="mb-8"
          entering={FadeInDown.delay(400).springify()}
        >
          <Text className="text-gray-700 font-medium mb-2 ml-1">Email</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
            <Feather name="mail" size={20} color="#888" />
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(500).springify()}
        >
          <TouchableOpacity
            className="bg-[#D92C2C] rounded-full py-4 items-center mb-6"
            onPress={handleResetPassword}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text className="text-white font-bold text-lg">
              {isLoading ? "Sending..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="items-center" 
            onPress={() => router.replace("/auth/LoginScreen")}
          >
            <Text className="text-[#D92C2C] font-medium">Back to Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}