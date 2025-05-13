import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NearbyMechanicScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [mechanics, setMechanics] = useState([
    {
      id: "m1",
      name: "Sample Mechanic 1",
      business: "Sample Mechanic 1's Auto Repair",
      reviews: 124,
      distance: "1.2 km",
      responseTime: "~5 min",
      services: ["Flat Tire", "Jump Start", "Towing"],
    },
    {
      id: "m2",
      name: "Sample Mechanic 2",
      business: "Quick Fix Auto",
      reviews: 98,
      distance: "2.5 km",
      responseTime: "~10 min",
      services: ["Flat Tire", "Jump Start", "Fuel Delivery"],
    },
    {
      id: "m3",
      name: "Sample Mechanic 3",
      business: "Roadside Heroes",
      reviews: 156,
      distance: "3.8 km",
      responseTime: "~15 min",
      services: ["Flat Tire", "Jump Start", "Towing", "Lockout"],
    },
    {
      id: "m4",
      name: "Sample Mechanic 4",
      business: "Express Mechanics",
      reviews: 112,
      distance: "4.2 km",
      responseTime: "~20 min",
      services: ["Flat Tire", "Jump Start", "Towing", "Fuel Delivery"],
    },
    {
      id: "m5",
      name: "Sample Mechanic 5",
      business: "Pro Auto Service",
      reviews: 87,
      distance: "5.1 km",
      responseTime: "~25 min",
      services: ["Flat Tire", "Jump Start", "Towing", "Lockout"],
    },
  ]);

  const filteredMechanics = mechanics.filter((mechanic) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      mechanic.name.toLowerCase().includes(query) ||
      mechanic.business.toLowerCase().includes(query) ||
      mechanic.services.some((service) => service.toLowerCase().includes(query))
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="pt-4 pb-6 px-6">
        <TouchableOpacity
          className="absolute top-4 left-6 z-10"
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          <Text className="text-white text-3xl font-bold">Nearby Mechanics</Text>
        </Animated.View>
      </View>
      <Animated.View
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <View className="p-4 border-b border-gray-200">
          <View className="relative mb-3">
            <TextInput
              className="bg-gray-100 rounded-full pl-10 pr-4 py-2.5 text-gray-800"
              placeholder="Search mechanics or services..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View className="absolute left-3.5 top-2.5">
              <Feather name="search" size={20} color="#9CA3AF" />
            </View>
          </View>
        </View>
        <ScrollView className="flex-1 p-4">
          {filteredMechanics.map((mechanic) => (
            <TouchableOpacity
              key={mechanic.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
              onPress={() =>
                router.push({
                  pathname: "/driver/MechanicProfilePreviewScreen",
                  params: { id: mechanic.id },
                })
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#D92C2C]/10 p-3 rounded-full mr-3">
                  <Feather name="user" size={24} color="#D92C2C" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-800">{mechanic.name}</Text>
                  <Text className="text-gray-600 text-sm">{mechanic.business}</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-gray-500 text-sm">
                      {mechanic.reviews} reviews
                    </Text>
                    <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                    <Text className="text-gray-600 text-sm">{mechanic.distance}</Text>
                    <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                    <Text className="text-gray-600 text-sm">
                      {mechanic.responseTime}
                    </Text>
                  </View>
                  <View className="flex-row flex-wrap mt-2">
                    {mechanic.services.map((service, index) => (
                      <View
                        key={index}
                        className="bg-[#D92C2C]/10 rounded-full px-3 py-1 mr-2 mb-2"
                      >
                        <Text className="text-[#D92C2C] text-sm">{service}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
