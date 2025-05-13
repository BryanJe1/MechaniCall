import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }
    
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    
    if (!password.trim()) {
      Alert.alert("Error", "Please enter a password");
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Success", 
        "Your account has been created!",
        [{ text: "Continue", onPress: () => router.push("/auth/UserTypeScreen") }]
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
          <Text className="text-white text-3xl font-bold">Create Account</Text>
          <Text className="text-white/80 text-base mt-2 text-center">
            Sign up to MechaniCall
          </Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px] px-6 pt-8"
        entering={FadeInUp.delay(300).springify()}
      >
        <View className="items-center mb-6">
          <View className="w-16 h-1 bg-gray-200 rounded-full mb-6" />
          <View className="items-center mb-6">
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
          <Text className="text-gray-700 font-medium mb-2 ml-1">Full Name</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <Feather name="user" size={20} color="#888" />
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
            />
          </View>
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
            />
          </View>
          <Text className="text-gray-700 font-medium mb-2 ml-1">Password</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <Feather name="lock" size={20} color="#888" />
            <TextInput
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#888" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-700 font-medium mb-2 ml-1">Confirm Password</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <Feather name="lock" size={20} color="#888" />
            <TextInput
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(500).springify()}
        >
          <TouchableOpacity
            className="bg-[#D92C2C] rounded-full py-4 items-center mb-6"
            onPress={handleSignUp}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text className="text-white font-bold text-lg">
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/auth/LoginScreen")}>
              <Text className="text-[#D92C2C] font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}