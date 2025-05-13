import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceRequestScreen() {
  const router = useRouter();
  const { service, mechanicId } = useLocalSearchParams();
  
  const [location, setLocation] = useState({
    latitude: 12.980365,
    longitude: 123.978763,
    address: "Pang Pang, Sorsogon City, Philippines",
  });
  const [selectedService, setSelectedService] = useState(service || "");
  const [requestDetails, setRequestDetails] = useState("");
  const [selectedMechanicId, setSelectedMechanicId] = useState(mechanicId || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const services: { id: string; title: string; icon: "disc" | "zap" | "truck" | "droplet" | "key" | "tool" }[] = [
      { id: "s1", title: "Flat Tire", icon: "disc" },
      { id: "s2", title: "Jump Start", icon: "zap" },
      { id: "s3", title: "Towing", icon: "truck" },
      { id: "s4", title: "Fuel Delivery", icon: "droplet" },
      { id: "s5", title: "Lockout", icon: "key" },
      { id: "s6", title: "Other", icon: "tool" },
    ];
  
  const nearbyMechanics = [
    {
      id: "m1",
      name: "Sample Mechanic 1",
      business: "Sample Mechanic 1's Auto Repair",
      rating: 4.8,
      distance: "1.2 km",
      responseTime: "~5 min",
    },
    {
      id: "m2",
      name: "Sample Mechanic 2",
      business: "Quick Fix Auto",
      rating: 4.6,
      distance: "2.5 km",
      responseTime: "~10 min",
    },
    {
      id: "m3",
      name: "Sample Mechanic 3",
      business: "Roadside Heroes",
      rating: 4.9,
      distance: "3.8 km",
      responseTime: "~15 min",
    },
  ];
  
  useEffect(() => {
    if (mechanicId) {
      setSelectedMechanicId(mechanicId);
    }
    
    if (service) {
      setSelectedService(service);
    }
  }, [service, mechanicId]);
  
  const submitRequest = () => {
    if (!selectedService) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push({
        pathname: "/driver/GPSTrackingScreen",
        params: { 
          service: selectedService,
          mechanicId: selectedMechanicId || nearbyMechanics[0].id
        }
      });
    }, 2000);
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
          <Text className="text-white text-3xl font-bold">Request Service</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView className="flex-1 p-6">
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Your Location</Text>
            <View className="h-[180px] rounded-xl overflow-hidden mb-3">
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                >
                  <View className="bg-[#D92C2C] p-2 rounded-full border-2 border-white">
                    <Feather name="map-pin" size={16} color="white" />
                  </View>
                </Marker>
              </MapView>
            </View>
            <View className="flex-row items-center bg-gray-100 rounded-lg p-3">
              <Feather name="map-pin" size={20} color="#6B7280" className="mr-2" />
              <Text className="flex-1 text-gray-800">{location.address}</Text>
              <TouchableOpacity>
                <Text className="text-[#D92C2C] font-medium">Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Select Service</Text>
            <View className="flex-row flex-wrap justify-between">
              {services.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  className={`mb-3 p-3 rounded-xl border w-[48%] ${
                    selectedService === item.title 
                      ? 'bg-[#D92C2C]/10 border-[#D92C2C]' 
                      : 'border-gray-200'
                  }`}
                  onPress={() => setSelectedService(item.title)}
                >
                  <View className="flex-row items-center">
                    <View className={`p-2 rounded-full mr-2 ${
                      selectedService === item.title 
                        ? 'bg-[#D92C2C]' 
                        : 'bg-gray-100'
                    }`}>
                      <Feather 
                        name={item.icon} 
                        size={20} 
                        color={selectedService === item.title ? "white" : "#6B7280"} 
                      />
                    </View>
                    <Text className={`font-medium ${
                      selectedService === item.title ? 'text-[#D92C2C]' : 'text-gray-800'
                    }`}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Request Details</Text>
            <TextInput
              className="border border-gray-200 rounded-xl p-4 min-h-[100px] text-gray-800"
              placeholder="Describe your issue (optional)..."
              multiline={true}
              value={requestDetails}
              onChangeText={setRequestDetails}
            />
          </View>
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Available Mechanics</Text>
            {nearbyMechanics.map((mechanic) => (
              <TouchableOpacity 
                key={mechanic.id}
                className={`bg-white rounded-xl shadow-sm border p-4 mb-3 ${
                  selectedMechanicId === mechanic.id
                    ? 'border-[#D92C2C]'
                    : 'border-gray-100'
                }`}
                onPress={() => setSelectedMechanicId(mechanic.id)}
              >
                <View className="flex-row items-center">
                  <View className={`p-3 rounded-full mr-3 ${
                    selectedMechanicId === mechanic.id
                      ? 'bg-[#D92C2C]/10'
                      : 'bg-gray-100'
                  }`}>
                    <Feather 
                      name="user" 
                      size={20} 
                      color={selectedMechanicId === mechanic.id ? "#D92C2C" : "#6B7280"} 
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-800">{mechanic.name}</Text>
                    <Text className="text-gray-600 text-sm">{mechanic.business}</Text>
                    <View className="flex-row items-center mt-1">
                      <Feather name="star" size={14} color="#F59E0B" />
                      <Text className="text-gray-700 text-sm ml-1">{mechanic.rating}</Text>
                      <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                      <Text className="text-gray-600 text-sm">{mechanic.distance}</Text>
                      <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                      <Text className="text-gray-600 text-sm">{mechanic.responseTime}</Text>
                    </View>
                  </View>
                  {selectedMechanicId === mechanic.id && (
                    <View className="bg-[#D92C2C] p-2 rounded-full">
                      <Feather name="check" size={16} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              className="mt-2 flex-row items-center justify-center"
              onPress={() => router.push("/driver/NearbyMechanicScreen")}
            >
              <Text className="text-[#D92C2C] font-medium">View More Mechanics</Text>
              <Feather name="chevron-right" size={16} color="#D92C2C" className="ml-1" />
            </TouchableOpacity>
          </View>
          <View className="bg-gray-50 p-4 rounded-xl mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-2">Price Estimate</Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Service Fee</Text>
              <Text className="font-medium text-gray-800">₱100.00</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Trip Fee</Text>
              <Text className="font-medium text-gray-800">₱50.00</Text>
            </View>
            <View className="flex-row justify-between pt-2 border-t border-gray-200 mt-2">
              <Text className="font-bold text-gray-800">Total</Text>
              <Text className="font-bold text-gray-800">₱150.00</Text>
            </View>
            <Text className="text-gray-500 text-xs mt-2">
              *Final price may vary based on actual service required
            </Text>
          </View>
        </ScrollView>
        <View className="p-6 border-t border-gray-200">
          <TouchableOpacity
            className={`rounded-full py-4 items-center ${
              !selectedService || isSubmitting ? 'bg-gray-400' : 'bg-[#D92C2C]'
            }`}
            onPress={submitRequest}
            disabled={!selectedService || isSubmitting}
          >
            {isSubmitting ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="white" size="small" />
                <Text className="text-white font-bold text-lg ml-2">Processing...</Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-lg">Request Service</Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}