import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MechanicProfilePreviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [mechanic, setMechanic] = useState({
    id: id,
    name: "Sample Mechanic 1",
    businessName: "Sample Mechanic 1's Auto Repair",
    rating: 4.8,
    totalReviews: 124,
    completedJobs: 342,
    distance: "1.2 km",
    responseTime: "Under 5 min",
    services: [
      { id: "s1", name: "Flat Tire", price: "₱100", icon: "disc" as const },
      { id: "s2", name: "Jump Start", price: "₱100", icon: "zap" as const },
      { id: "s3", name: "Towing", price: "₱1000", icon: "truck" as const },
      { id: "s4", name: "Fuel Delivery", price: "₱100", icon: "droplet" as const },
      { id: "s5", name: "Lockout", price: "₱100", icon: "key" as const },
    ],
    reviews: [
      { id: "r1", user: "Sample Review 1", rating: 5, comment: "Excellent service! Arrived quickly and fixed my flat tire in no time.", date: "2 days ago" },
      { id: "r2", user: "Sample Review 2", rating: 4, comment: "Very professional and helpful. Would recommend.", date: "1 week ago" },
      { id: "r3", user: "Sample Review 3", rating: 5, comment: "Saved me when I was stranded with a dead battery. Great service!", date: "2 weeks ago" },
    ],
  });
  
  const requestService = (serviceType: string) => {
    router.push({
      pathname: "/driver/ServiceRequestScreen",
      params: { service: serviceType, mechanicId: mechanic.id }
    });
  };

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
          <Text className="text-white text-3xl font-bold">Mechanic Profile</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView className="flex-1">
          <View className="p-6 border-b border-gray-200">
            <View className="items-center">
              <View className="bg-[#D92C2C]/10 p-6 rounded-full mb-4">
                <Feather name="user" size={48} color="#D92C2C" />
              </View>
              <Text className="text-2xl font-bold">{mechanic.name}</Text>
              <Text className="text-gray-600 mb-2">{mechanic.businessName}</Text>
              <View className="flex-row items-center">
                <Feather name="star" size={16} color="#F59E0B" />
                <Text className="text-gray-700 ml-1">{mechanic.rating}</Text>
                <Text className="text-gray-500 ml-1">({mechanic.totalReviews} reviews)</Text>
              </View>
            </View>
            <View className="flex-row justify-between mt-6">
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Jobs</Text>
                <Text className="font-bold mt-1">{mechanic.completedJobs}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Distance</Text>
                <Text className="font-bold mt-1">{mechanic.distance}</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Response</Text>
                <Text className="font-bold mt-1">{mechanic.responseTime}</Text>
              </View>
            </View>
          </View>
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-bold mb-4">Services Offered</Text>
            {mechanic.services.map((service) => (
              <View 
                key={service.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-row items-center">
                  <View className="bg-[#D92C2C]/10 p-2 rounded-full mr-3">
                    <Feather name={service.icon} size={20} color="#D92C2C" />
                  </View>
                  <Text className="text-gray-800">{service.name}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="font-bold text-gray-800 mr-3">{service.price}</Text>
                  <TouchableOpacity 
                    className="bg-[#D92C2C] py-1 px-3 rounded-full"
                    onPress={() => requestService(service.name)}
                  >
                    <Text className="text-white text-xs font-medium">Request</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View className="p-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Reviews</Text>
              <TouchableOpacity>
                <Text className="text-[#D92C2C] font-medium">See All</Text>
              </TouchableOpacity>
            </View>
            {mechanic.reviews.map((review) => (
              <View key={review.id} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-gray-800">{review.user}</Text>
                  <View className="flex-row items-center">
                    {[...Array(5)].map((_, i) => (
                      <Feather 
                        key={i}
                        name="star" 
                        size={14} 
                        color={i < review.rating ? "#F59E0B" : "#E5E7EB"} 
                      />
                    ))}
                  </View>
                </View>
                <Text className="text-gray-600 mb-1">{review.comment}</Text>
                <Text className="text-gray-400 text-xs">{review.date}</Text>
              </View>
            ))}
          </View>
          <View className="p-6">
            <TouchableOpacity
              className="bg-[#D92C2C] rounded-full py-4 items-center"
              onPress={() => router.push({
                pathname: "/driver/ServiceRequestScreen",
                params: { mechanicId: mechanic.id }
              })}
            >
              <Text className="text-white font-bold text-lg">Request Service</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4 py-2 items-center"
            >
              <Text className="text-[#D92C2C] font-medium">Message Mechanic</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}