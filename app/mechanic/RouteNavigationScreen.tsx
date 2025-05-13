import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function RouteNavigationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [request, setRequest] = useState({
    id: id,
    customer: "Sample Customer 1",
    service: "Flat Tire",
    status: "in_progress",
    customerLocation: {
      latitude: 12.981747,
      longitude: 123.975618,
      address: "Pang Pang, Sorsogon City, Sorsogon",
    },
    mechanicLocation: {
      latitude: 12.972107,
      longitude: 123.990317,
    },
    estimatedTime: "12 min",
    distance: "1.2 km",
  });
  
  const [routeCoordinates, setRouteCoordinates] = useState([
    { latitude: 12.972107, longitude: 123.990317 },
    { latitude: 12.974500, longitude: 123.985000 },
    { latitude: 12.977000, longitude: 123.980000 },
    { latitude: 12.979500, longitude: 123.978000 },
    { latitude: 12.981747, longitude: 123.975618 },
  ]);
  
  const [region, setRegion] = useState({
    latitude: 12.9739,
    longitude: 124.0076,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [directions, setDirections] = useState([
    "Head north on Executive Village",
    "Straigh into Santa Clara Hotel",
    "Continue for 0.5 km",
    "Ready for the intersection",
    "Your destination is next to petron station",
  ]);
  
  useEffect(() => {
    if (navigationStarted) {
      const interval = setInterval(() => {
        if (currentStep < directions.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          clearInterval(interval);
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [navigationStarted, currentStep]);
  
  const startNavigation = () => {
    setNavigationStarted(true);
  };
  
  const stopNavigation = () => {
    setNavigationStarted(false);
    setCurrentStep(0);
  };
  
  const markAsArrived = () => {
    router.push({ pathname: "/mechanic/MarkCompletedScreen", params: { id } });
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
          <Text className="text-white text-3xl font-bold">Navigation</Text>
          <Text className="text-white/80 text-base mt-2">
            {request.estimatedTime} ({request.distance})
          </Text>
        </Animated.View>
      </View>
      <View className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: width, height: height * 0.65 }}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={request.mechanicLocation}
            title="Your Location"
          >
            <View className="bg-[#D92C2C] p-2 rounded-full border-2 border-white">
              <Feather name="tool" size={16} color="white" />
            </View>
          </Marker>
          <Marker
            coordinate={request.customerLocation}
            title={request.customer}
            description={request.service}
          >
            <View className="bg-blue-500 p-2 rounded-full border-2 border-white">
              <Feather name="user" size={16} color="white" />
            </View>
          </Marker>
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#D92C2C"
            strokeWidth={4}
            lineDashPattern={[0]}
          />
        </MapView>
        <Animated.View 
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[30px] shadow-lg"
          entering={FadeInDown.delay(300).springify()}
        >
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <View className="bg-[#D92C2C]/10 p-3 rounded-full mr-3">
                <Feather name="user" size={20} color="#D92C2C" />
              </View>
              <View>
                <Text className="font-bold text-gray-800">{request.customer}</Text>
                <Text className="text-gray-600">{request.customerLocation.address}</Text>
              </View>
            </View>
          </View>
          <View className="p-4">
            <View className="flex-row items-center mb-4">
              <View className="bg-blue-100 p-2 rounded-full mr-3">
                <Feather name="navigation" size={20} color="#3B82F6" />
              </View>
              <Text className="font-bold text-gray-800">
                {navigationStarted ? `Step ${currentStep + 1} of ${directions.length}` : "Ready to Navigate"}
              </Text>
            </View>
            {navigationStarted && (
              <View className="bg-gray-50 p-3 rounded-xl mb-4">
                <Text className="text-gray-800 font-medium">{directions[currentStep]}</Text>
              </View>
            )}
            <View className="flex-row">
              {!navigationStarted ? (
                <TouchableOpacity
                  className="bg-[#D92C2C] rounded-full py-3 flex-1 items-center"
                  onPress={startNavigation}
                >
                  <Text className="text-white font-bold">Start Navigation</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    className="bg-gray-200 rounded-full py-3 flex-1 items-center mr-2"
                    onPress={stopNavigation}
                  >
                    <Text className="text-gray-800 font-bold">Stop</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    className="bg-green-600 rounded-full py-3 flex-1 items-center ml-2"
                    onPress={markAsArrived}
                  >
                    <Text className="text-white font-bold">I've Arrived</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <View className="p-4 border-t border-gray-200">
            <View className="flex-row">
              <TouchableOpacity
                className="bg-blue-500 rounded-full py-3 flex-1 items-center mr-2"
              >
                <Text className="text-white font-bold">Call Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-100 rounded-full py-3 flex-1 items-center ml-2"
              >
                <Text className="text-gray-800 font-bold">Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}