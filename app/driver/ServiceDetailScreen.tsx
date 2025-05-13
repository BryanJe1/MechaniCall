import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [service, setService] = useState({
    id: id,
    type: "Flat Tire",
    mechanic: {
      id: "m1",
      name: "Sample Mechanic 1",
      businessName: "Sample Mechanic 1's Auto Repair",
      rating: 4.8,
    },
    date: "April 26, 2025",
    time: "10:30 AM",
    duration: "45 minutes",
    status: "completed",
    location: {
      address: "Pang Pang Sorsogon City Philippines",
      latitude: 12.980365,
      longitude: 123.978763,
    },
    payment: {
      amount: 100.00,
      method: "Credit Card (****4567)",
      status: "paid",
    },
    rating: 5,
    hasReviewed: true,
    notes: "Replaced front passenger tire with a new one. Checked pressure on all tires.",
  });
  
  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "Flat Tire":
        return "disc";
      case "Jump Start":
        return "zap";
      case "Towing":
        return "truck";
      case "Fuel Delivery":
        return "droplet";
      case "Lockout":
        return "key";
      default:
        return "tool";
    }
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
          <Text className="text-white text-3xl font-bold">Service Details</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView className="flex-1">
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <View className="bg-green-100 p-2 rounded-full mr-3">
                <Feather name="check" size={20} color="#10B981" />
              </View>
              <View>
                <Text className="font-bold text-gray-800">
                  Service {service.status === "completed" ? "Completed" : "In Progress"}
                </Text>
                <Text className="text-gray-600">
                  {service.date} at {service.time}
                </Text>
              </View>
            </View>
          </View>
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-800 mb-4">Service Information</Text>
            <View className="flex-row items-center mb-4">
              <View className="bg-[#D92C2C]/10 p-3 rounded-full mr-3">
                <Feather name={getServiceIcon(service.type)} size={20} color="#D92C2C" />
              </View>
              <View>
                <Text className="font-bold text-gray-800">{service.type}</Text>
                <Text className="text-gray-600">Duration: {service.duration}</Text>
              </View>
            </View>
            {service.notes && (
              <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-gray-800">{service.notes}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity 
            className="p-6 border-b border-gray-200"
            onPress={() => router.push({ pathname: "/driver/MechanicProfilePreviewScreen", params: { id: service.mechanic.id } })}
          >
            <Text className="text-lg font-bold text-gray-800 mb-4">Mechanic</Text>
            <View className="flex-row items-center">
              <View className="bg-[#D92C2C]/10 p-3 rounded-full mr-3">
                <Feather name="user" size={20} color="#D92C2C" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">{service.mechanic.name}</Text>
                <Text className="text-gray-600">{service.mechanic.businessName}</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="star" size={14} color="#F59E0B" />
                <Text className="text-gray-700 ml-1">{service.mechanic.rating}</Text>
                <Feather name="chevron-right" size={16} color="#9CA3AF" className="ml-2" />
              </View>
            </View>
          </TouchableOpacity>
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-800 mb-4">Location</Text>
            <Text className="text-gray-800 mb-3">{service.location.address}</Text>
            <View className="h-[200px] rounded-xl overflow-hidden">
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: service.location.latitude,
                  longitude: service.location.longitude,
                  latitudeDelta: 0.0005,
                  longitudeDelta: 0.0005,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: service.location.latitude,
                    longitude: service.location.longitude,
                  }}
                >
                  <View className="bg-[#D92C2C] p-2 rounded-full border-2 border-white">
                    <Feather name="map-pin" size={16} color="white" />
                  </View>
                </Marker>
              </MapView>
            </View>
          </View>
          <TouchableOpacity 
            className="p-6 border-b border-gray-200"
            onPress={() => router.push("/driver/PaymentScreen")}
          >
            <Text className="text-lg font-bold text-gray-800 mb-4">Payment</Text>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="bg-green-100 p-2 rounded-full mr-3">
                  <Feather name="credit-card" size={20} color="#10B981" />
                </View>
                <View>
                  <Text className="font-bold text-gray-800">${service.payment.amount.toFixed(2)}</Text>
                  <Text className="text-gray-600">{service.payment.method}</Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <Text className={`font-medium ${
                  service.payment.status === "paid" ? "text-green-600" : "text-yellow-600"
                }`}>
                  {service.payment.status === "paid" ? "Paid" : "Pending"}
                </Text>
                <Feather name="chevron-right" size={16} color="#9CA3AF" className="ml-2" />
              </View>
            </View>
          </TouchableOpacity>
          <View className="p-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Rating & Review</Text>
            {service.hasReviewed ? (
              <View>
                <View className="flex-row mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Feather 
                      key={i}
                      name="star" 
                      size={20} 
                      color={i < service.rating ? "#F59E0B" : "#E5E7EB"} 
                    />
                  ))}
                </View>
                <Text className="text-gray-600">You rated this service {service.rating} stars.</Text>
              </View>
            ) : (
              <TouchableOpacity
                className="bg-[#D92C2C] rounded-full py-3 items-center"
                onPress={() => router.push({ pathname: "/driver/RatingScreen", params: { id: service.id } })}
              >
                <Text className="text-white font-medium">Rate This Service</Text>
              </TouchableOpacity>
            )}
          </View>
          <View className="p-6 pt-0">
            <TouchableOpacity
              className="bg-gray-100 rounded-full py-3 items-center mb-4"
              onPress={() => router.push({
                pathname: "/driver/ServiceRequestScreen",
                params: { 
                  service: service.type,
                  mechanicId: service.mechanic.id
                }
              })}
            >
              <Text className="text-gray-800 font-medium">Request Similar Service</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2 items-center"
            >
              <Text className="text-[#D92C2C] font-medium">Report an Issue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}