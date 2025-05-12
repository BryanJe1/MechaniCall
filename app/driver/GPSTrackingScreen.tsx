import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GPSTrackingScreen() {
  const router = useRouter();
  const { service, mechanicId } = useLocalSearchParams();
  
  const [driverLocation, setDriverLocation] = useState({
    latitude: 12.980365,
    longitude: 123.978763,
  });
  
  const [mechanicLocation, setMechanicLocation] = useState({
    latitude: 12.972094,
    longitude: 123.990616,
  });
  
  const [mechanic, setMechanic] = useState({
    id: mechanicId,
    name: "Sample Mechanic 1",
    business: "Sample Mechanic 1's Auto Repair",
    rating: 4.8,
    eta: "10 minutes",
    distance: "2.5 km",
    status: "on the way",
    vehicle: "White Ford Transit Van",
    licensePlate: "ABC123",
  });
  
  const [serviceRequest, setServiceRequest] = useState({
    id: "sr1",
    type: service || "Flat Tire",
    status: "in progress",
    requestTime: new Date(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMechanicLocation(prev => ({
        latitude: prev.latitude - 0.0005,
        longitude: prev.longitude - 0.0005,
      }));
      
      setMechanic(prev => ({
        ...prev,
        eta: parseInt(prev.eta) - 1 > 0 ? (parseInt(prev.eta) - 1) + " minutes" : "Arriving",
        distance: (parseFloat(prev.distance) - 0.1).toFixed(1) + " km",
      }));
      
      if (parseFloat(mechanic.distance) < 0.3) {
        setMechanic(prev => ({
          ...prev,
          status: "arrived"
        }));
        
        setServiceRequest(prev => ({
          ...prev,
          status: "started"
        }));
        
        clearInterval(interval);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [mechanic.distance]);
  
  const cancelRequest = () => {
    Alert.alert(
      "Cancel Request",
      "Are you sure you want to cancel this service request?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            router.replace("/driver/DriverDashboard");
          }
        }
      ]
    );
  };
  
  const viewMechanicProfile = () => {
    router.push({ pathname: "/driver/MechanicProfilePreviewScreen", params: { id: mechanic.id } });
  };
  
  const getStatusColor = () => {
    if (mechanic.status === "on the way") return "#3B82F6";
    if (mechanic.status === "arrived") return "#10B981";
    return "#D92C2C";
  };

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="pt-4 pb-6 px-6">
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          <Text className="text-white text-3xl font-bold">Track Mechanic</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <View className="flex-1">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: (driverLocation.latitude + mechanicLocation.latitude) / 2,
              longitude: (driverLocation.longitude + mechanicLocation.longitude) / 2,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={driverLocation}
              title="Your Location"
            >
              <View className="bg-[#D92C2C] p-2 rounded-full border-2 border-white">
                <Feather name="map-pin" size={16} color="white" />
              </View>
            </Marker>
            <Marker
              coordinate={mechanicLocation}
              title={mechanic.name}
              description={mechanic.status}
            >
              <View className="bg-blue-500 p-2 rounded-full border-2 border-white">
                <Feather name="truck" size={16} color="white" />
              </View>
            </Marker>
            <Polyline
              coordinates={[driverLocation, mechanicLocation]}
              strokeColor="#3B82F6"
              strokeWidth={3}
              lineDashPattern={[1, 3]}
            />
          </MapView>
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[30px] shadow-lg">
            <View className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />
            <View className="border-b border-gray-200 p-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <View className={`p-2 rounded-full mr-3`} style={{ backgroundColor: `${getStatusColor()}20` }}>
                    <Feather 
                      name={mechanic.status === "arrived" ? "check" : "clock"} 
                      size={20} 
                      color={getStatusColor()} 
                    />
                  </View>
                  <View>
                    <Text className="font-bold text-gray-800">{serviceRequest.type}</Text>
                    <Text className="text-gray-600 capitalize">{mechanic.status}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="font-bold text-gray-800">{mechanic.eta}</Text>
                  <Text className="text-gray-600">{mechanic.distance}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              className="flex-row items-center p-4 border-b border-gray-200"
              onPress={viewMechanicProfile}
            >
              <View className="bg-gray-100 p-3 rounded-full mr-3">
                <Feather name="user" size={24} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">{mechanic.name}</Text>
                <Text className="text-gray-600">{mechanic.business}</Text>
                <View className="flex-row items-center mt-1">
                  <Feather name="star" size={14} color="#F59E0B" />
                  <Text className="text-gray-700 ml-1">{mechanic.rating}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-gray-600">{mechanic.vehicle}</Text>
                <Text className="font-bold text-gray-800 mt-1">{mechanic.licensePlate}</Text>
              </View>
            </TouchableOpacity>
            <View className="p-4 flex-row">
              <TouchableOpacity
                className="flex-1 bg-gray-100 py-3 rounded-full mr-3 items-center"
              >
                <View className="flex-row items-center">
                  <Feather name="message-circle" size={20} color="#4B5563" />
                  <Text className="font-medium text-gray-800 ml-2">Message</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-[#D92C2C] py-3 rounded-full items-center"
                onPress={() => cancelRequest()}
              >
                <View className="flex-row items-center">
                  <Feather name="x" size={20} color="white" />
                  <Text className="font-medium text-white ml-2">Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}