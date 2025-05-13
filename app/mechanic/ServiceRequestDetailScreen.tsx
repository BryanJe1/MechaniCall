import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ServiceRequestDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [request, setRequest] = useState({
    id: id,
    service: "Flat Tire",
    customer: "Sample Customer 1",
    customerPhone: "+639 123 456 7890",
    status: "accepted",
    distance: "1.2 km",
    time: "5 min ago",
    earnings: "₱500.00",
    estimatedArrival: "12 minutes",
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: "2019",
      color: "Blue",
      licensePlate: "ABC123",
    },
    location: {
      latitude: 12.981747,
      longitude: 123.975618,
      address: "Pang Pang Sorsogon, Sorsogon City, Philippines",
    },
    description: "I have a flat tire on the front passenger side. I don't have a spare tire with me.",
    customerRating: 4.8,
    customerTrips: 12,
  });
  
  const [region, setRegion] = useState({
    latitude: request.location.latitude,
    longitude: request.location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };
  
  const getServiceIcon = (service: string) => {
    switch (service) {
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
  
  const startService = () => {
    setRequest({
      ...request,
      status: "in_progress",
    });
  };
  
  const cancelService = () => {
    router.back();
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
          <Text className="text-white text-3xl font-bold">Service Request</Text>
          <Text className="text-white/80 text-base mt-2">
            {request.service} - {request.distance}
          </Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView className="flex-1">
          <View className={`p-4 border-b border-gray-200 ${request.status === 'pending' ? 'bg-yellow-50' : ''}`}>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className={`p-2 rounded-full mr-3 ${
                  request.status === 'pending' ? 'bg-yellow-100' : 
                  request.status === 'accepted' || request.status === 'in_progress' ? 'bg-blue-100' : 
                  request.status === 'completed' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Feather 
                    name={
                      request.status === 'pending' ? 'clock' : 
                      request.status === 'accepted' || request.status === 'in_progress' ? 'tool' : 
                      request.status === 'completed' ? 'check' : 'x'
                    } 
                    size={20} 
                    color={
                      request.status === 'pending' ? '#D97706' : 
                      request.status === 'accepted' || request.status === 'in_progress' ? '#2563EB' : 
                      request.status === 'completed' ? '#10B981' : '#EF4444'
                    } 
                  />
                </View>
                <View>
                  <Text className="font-bold text-gray-800">
                    Status: {getStatusText(request.status)}
                  </Text>
                  <Text className="text-gray-600">
                    {request.status === 'accepted' ? `ETA: ${request.estimatedArrival}` : 
                     request.status === 'in_progress' ? 'Service in progress' : 
                     request.status === 'completed' ? 'Service completed' : 
                     request.status === 'cancelled' ? 'Service cancelled' : 'Awaiting response'}
                  </Text>
                </View>
              </View>
              <View className={`px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
                <Text className={`text-xs font-medium ${getStatusColor(request.status)}`}>
                  {getStatusText(request.status)}
                </Text>
              </View>
            </View>
          </View>
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-800 mb-3">Customer Information</Text>
            <View className="flex-row items-center mb-3">
              <View className="bg-[#D92C2C]/10 p-3 rounded-full mr-3">
                <Feather name="user" size={20} color="#D92C2C" />
              </View>
              <View>
                <Text className="font-bold text-gray-800">{request.customer}</Text>
                <View className="flex-row items-center">
                  <Feather name="star" size={14} color="#F59E0B" />
                  <Text className="text-gray-600 ml-1">{request.customerRating}</Text>
                  <Text className="text-gray-400 mx-1">•</Text>
                  <Text className="text-gray-600">{request.customerTrips} trips</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full mr-3">
                <Feather name="phone" size={16} color="#3B82F6" />
              </View>
              <Text className="text-blue-600 font-medium">{request.customerPhone}</Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-800 mb-3">Vehicle Information</Text>
            <View className="bg-gray-50 rounded-xl p-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Make & Model:</Text>
                <Text className="font-medium text-gray-800">
                  {request.vehicle.make} {request.vehicle.model}
                </Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Year:</Text>
                <Text className="font-medium text-gray-800">{request.vehicle.year}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Color:</Text>
                <Text className="font-medium text-gray-800">{request.vehicle.color}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">License Plate:</Text>
                <Text className="font-medium text-gray-800">{request.vehicle.licensePlate}</Text>
              </View>
            </View>
          </View>
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-800 mb-3">Service Details</Text>
            <View className="flex-row items-center mb-3">
              <View className="bg-[#D92C2C]/10 p-2 rounded-full mr-3">
                <Feather name={getServiceIcon(request.service)} size={20} color="#D92C2C" />
              </View>
              <View>
                <Text className="font-bold text-gray-800">{request.service}</Text>
                <Text className="text-gray-600">Estimated earnings: {request.earnings}</Text>
              </View>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 mb-3">
              <Text className="text-gray-800">{request.description}</Text>
            </View>
          </View>
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-800 mb-3">Location</Text>
            <View className="mb-3">
              <Text className="text-gray-800 mb-1">{request.location.address}</Text>
              <Text className="text-gray-600">{request.distance} from your location</Text>
            </View>
            <View className="h-[200px] rounded-xl overflow-hidden mb-3">
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={region}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: request.location.latitude,
                    longitude: request.location.longitude,
                  }}
                  title={request.customer}
                  description={request.service}
                >
                  <View className="bg-[#D92C2C] p-2 rounded-full border-2 border-white">
                    <Feather name="map-pin" size={16} color="white" />
                  </View>
                </Marker>
              </MapView>
            </View>
            <TouchableOpacity 
              className="flex-row items-center justify-center bg-gray-100 py-2 rounded-xl"
              onPress={() => router.push({ pathname: "/mechanic/RouteNavigationScreen", params: { id: request.id } })}
            >
              <Feather name="map" size={16} color="#4B5563" />
              <Text className="text-gray-700 font-medium ml-2">Open in Maps</Text>
            </TouchableOpacity>
          </View>
          <View className="p-6">
            {request.status === 'pending' && (
              <View className="flex-row">
                <TouchableOpacity
                  className="bg-[#D92C2C] rounded-full py-4 flex-1 items-center mr-2"
                  onPress={startService}
                >
                  <Text className="text-white font-bold text-lg">Accept Request</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-200 rounded-full py-4 flex-1 items-center ml-2"
                  onPress={cancelService}
                >
                  <Text className="text-gray-800 font-bold text-lg">Decline</Text>
                </TouchableOpacity>
              </View>
            )}
            {(request.status === 'accepted' || request.status === 'in_progress') && (
              <>
                <TouchableOpacity
                  className="bg-[#D92C2C] rounded-full py-4 items-center mb-4"
                  onPress={() => router.push({ pathname: "/mechanic/RouteNavigationScreen", params: { id: request.id } })}
                >
                  <Text className="text-white font-bold text-lg">Navigate to Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-600 rounded-full py-4 items-center mb-4"
                  onPress={() => router.push({ pathname: "/mechanic/MarkCompletedScreen", params: { id: request.id } })}
                >
                  <Text className="text-white font-bold text-lg">Mark as Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-100 rounded-full py-4 items-center"
                >
                  <Text className="text-gray-800 font-bold text-lg">Message Customer</Text>
                </TouchableOpacity>
              </>
            )}
            {request.status === 'completed' && (
              <View className="bg-green-100 p-4 rounded-xl">
                <Text className="text-green-800 text-center font-medium">
                  This service has been marked as completed
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}