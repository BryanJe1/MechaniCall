import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = Dimensions.get("window");

  const handleSignIn = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const mechanicAccount = {
        email: "mechanic.com",
        password: "12345"
      };
      const driverAccount = {
        email: "driver.com",
        password: "12345"
      };

      if (email === mechanicAccount.email && password === mechanicAccount.password) {
        router.replace("/mechanic/MechanicDashboard");
      } else if (email === driverAccount.email && password === driverAccount.password) {
        router.replace("/driver/DriverDashboard");
      } else {
        Alert.alert("Login Failed", "Invalid email or password.");
      }
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="pt-10 pb-6 px-6">
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          <Text className="text-white text-3xl font-bold">Welcome To MechaniCall</Text>
          <Text className="text-white/80 text-base mt-2">Sign in to continue</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px] px-6 pt-8"
        entering={FadeInUp.delay(300).springify()}
      >
        <View className="items-center mb-8">
          <View className="w-16 h-1 bg-gray-200 rounded-full mb-8" /> 
          <View className="items-center">
            <View className="w-40 h-0.5 bg-[#D92C2C] mb-1" />
            <View className="flex-row items-center">
              <View className="w-10 h-10 border-2 border-gray-300 rounded-full mr-16">
                <View className="w-2 h-2 bg-[#D92C2C] rounded-full absolute top-1 left-1" />
              </View>
              <View className="w-10 h-10 border-2 border-gray-300 rounded-full">
                <View className="w-2 h-2 bg-[#D92C2C] rounded-full absolute top-1 left-1" />
              </View>
            </View>
          </View>
        </View>
        <Animated.View 
          className="mb-6"
          entering={FadeInDown.delay(400).springify()}
        >
          <Text className="text-gray-700 font-medium mb-2 ml-1">Email</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <Feather name="mail" size={20} color="#888" />
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>
          <Text className="text-gray-700 font-medium mb-2 ml-1">Password</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
            <Feather name="lock" size={20} color="#888" />
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
              editable={!isLoading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
              <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <TouchableOpacity 
          className="items-end mb-8" 
          onPress={() => router.push("/auth/ForgotPasswordScreen")}
          disabled={isLoading}
        >
          <Text className="text-[#D92C2C] font-medium">Forgot Password?</Text>
        </TouchableOpacity>
        <Animated.View
          entering={FadeInUp.delay(500).springify()}
        >
          <TouchableOpacity
            className="bg-[#D92C2C] rounded-full py-4 items-center mb-6"
            onPress={handleSignIn}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Sign In</Text>
            )}
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/SignUpScreen")} disabled={isLoading}>
              <Text className="text-[#D92C2C] font-medium">Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-6 items-center">
            <Text className="text-gray-500 text-sm font-medium">Sample Accounts:</Text>
            <Text className="text-gray-500 text-sm">Mechanic - Email: mechanic.com | Password: 12345</Text>
            <Text className="text-gray-500 text-sm">Driver - Email: driver.com | Password: 12345</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}