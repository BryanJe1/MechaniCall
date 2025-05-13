import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserTypeScreen() {
  const router = useRouter();

  const selectUserType = (type: string) => {
    if (type === 'driver') {
      router.push("/auth/DriverInfoScreen");
    } else {
      router.push("/auth/MechanicInfoScreen");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="pt-10 pb-6 px-6">
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          <Text className="text-white text-3xl font-bold">Choose Your Role</Text>
          <Text className="text-white/80 text-base mt-2 text-center">
            Select how you'll use the MechaniCall App
          </Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px] px-6 pt-8"
        entering={FadeInUp.delay(300).springify()}
      >
        <View className="items-center mb-8">
          <View className="w-16 h-1 bg-gray-200 rounded-full mb-6" />
        </View>
        <Animated.View 
          className="flex-1 justify-center gap-6"
          entering={FadeInDown.delay(400).springify()}
        >
          <TouchableOpacity
            className="bg-white border border-gray-200 rounded-2xl p-6 flex-row items-center"
            style={{ elevation: 2 }}
            activeOpacity={0.8}
            onPress={() => selectUserType('driver')}
          >
            <View className="bg-[#D92C2C]/10 p-4 rounded-full">
              <Feather name="user" size={28} color="#D92C2C" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-gray-800">I'm a Driver</Text>
              <Text className="text-gray-600 mt-1">
                Need roadside assistance for your vehicle
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#D92C2C" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white border border-gray-200 rounded-2xl p-6 flex-row items-center"
            style={{ elevation: 2 }}
            activeOpacity={0.8}
            onPress={() => selectUserType('mechanic')}
          >
            <View className="bg-[#D92C2C]/10 p-4 rounded-full">
              <Feather name="tool" size={28} color="#D92C2C" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-gray-800">I'm a Mechanic</Text>
              <Text className="text-gray-600 mt-1">
                Provide roadside assistance services
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#D92C2C" />
          </TouchableOpacity>
        </Animated.View>
        <View className="mb-6 items-center">
          <TouchableOpacity onPress={() => router.push("/auth/LoginScreen")}>
            <Text className="text-[#D92C2C] font-medium">
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}