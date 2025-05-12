import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverDashboard() {
  const router = useRouter();
  const [location, setLocation] = useState({
    latitude: 12.980365,
    longitude: 123.978763,
  });
  const [activeTab, setActiveTab] = useState("home");
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  
  const services: { id: string; title: string; icon: "disc" | "zap" | "truck" | "droplet" }[] = [
    { id: "s1", title: "Flat Tire", icon: "disc" },
    { id: "s2", title: "Jump Start", icon: "zap" },
    { id: "s3", title: "Towing", icon: "truck" },
    { id: "s4", title: "Fuel Delivery", icon: "droplet" },
  ];
  
  const nearbyMechanics = [
    {
      id: "m1",
      name: "Sample Mechanic 1",
      business: "Sample Mechanic 1's Auto Repair",
      rating: 4.8,
      distance: "1.2 km",
      responseTime: "~5 min",
      latitude: 12.972094,
      longitude: 123.990616,
    },
    {
      id: "m2",
      name: "Sample Mechanic 2",
      business: "Quick Fix Auto",
      rating: 4.6,
      distance: "2.5 km",
      responseTime: "~10 min",
      latitude: 12.970896,
      longitude: 124.003104,
    },
  ];
  
  const recentServices = [
    {
      id: "rs1",
      type: "Flat Tire",
      date: "March 15, 2025",
      mechanic: "Sample Mechanic 1",
      status: "completed",
    },
    {
      id: "rs2",
      type: "Jump Start",
      date: "April 10, 2025",
      mechanic: "Sample Mechanic 2",
      status: "completed",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="px-6 pt-4 pb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-white text-lg">Hello, Sample Account</Text>
          <Text className="text-white text-3xl font-bold">Dashboard</Text>
        </View>
      </View>
      <Animated.View 
        entering={FadeInDown.delay(300).springify()}
        className="flex-1 bg-white rounded-t-[30px]"
      >
        <ScrollView className="flex-1">
          <View className="px-6 pt-6">
            <View className="h-[180px] rounded-xl overflow-hidden mb-6">
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
                  title="You are here"
                >
                  <View className="bg-[#D92C2C] p-2 rounded-full border-2 border-white">
                    <Feather name="map-pin" size={16} color="white" />
                  </View>
                </Marker>
                {nearbyMechanics.map((mechanic) => (
                  <Marker
                    key={mechanic.id}
                    coordinate={{
                      latitude: mechanic.latitude,
                      longitude: mechanic.longitude,
                    }}
                    title={mechanic.name}
                    description={mechanic.business}
                  >
                    <View className="bg-blue-500 p-2 rounded-full border-2 border-white">
                      <Feather name="tool" size={16} color="white" />
                    </View>
                  </Marker>
                ))}
              </MapView>
              <TouchableOpacity 
                className="absolute right-3 bottom-3 bg-white p-2 rounded-full shadow-md"
              >
                <Feather name="navigation" size={20} color="#D92C2C" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="px-6 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">Services</Text>
              <TouchableOpacity>
                <Text className="text-[#D92C2C] font-medium">See All</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id}
                  icon={service.icon} 
                  title={service.title} 
                  onPress={() => router.push({
                    pathname: "/driver/ServiceRequestScreen",
                    params: { service: service.title }
                  })}
                />
              ))}
            </View>
          </View>
          <View className="px-6 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">Nearby Mechanics</Text>
              <TouchableOpacity onPress={() => router.push("/driver/NearbyMechanicScreen")}>
                <Text className="text-[#D92C2C] font-medium">See All</Text>
              </TouchableOpacity>
            </View>
            {nearbyMechanics.map((mechanic) => (
              <TouchableOpacity 
                key={mechanic.id}
                onPress={() => router.push({ pathname: "/driver/MechanicProfilePreviewScreen", params: { id: mechanic.id } })}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
              >
                <View className="flex-row items-center">
                  <View className="bg-[#D92C2C]/10 p-3 rounded-full mr-3">
                    <Feather name="user" size={24} color="#D92C2C" />
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
                  <TouchableOpacity 
                    className="bg-[#D92C2C] p-2 rounded-full"
                    onPress={() => router.push({
                      pathname: "/driver/ServiceRequestScreen",
                      params: { mechanicId: mechanic.id }
                    })}
                  >
                    <Feather name="phone-call" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="px-6 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">Recent Services</Text>
              <TouchableOpacity onPress={() => router.push("/driver/ServiceHistoryScreen")}>
                <Text className="text-[#D92C2C] font-medium">See All</Text>
              </TouchableOpacity>
            </View>
            {recentServices.map((service) => (
              <TouchableOpacity 
                key={service.id}
                onPress={() => router.push({ pathname: "/driver/ServiceRequestScreen", params: { id: service.id } })}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View className="bg-[#D92C2C]/10 p-3 rounded-full mr-3">
                      <Feather name={service.type === "Flat Tire" ? "disc" : "zap"} size={20} color="#D92C2C" />
                    </View>
                    <View>
                      <Text className="font-bold text-gray-800">{service.type}</Text>
                      <Text className="text-gray-600 text-sm">{service.date}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-600 text-sm mb-1">{service.mechanic}</Text>
                    <View className="bg-green-100 px-2 py-1 rounded">
                      <Text className="text-green-700 text-xs font-medium">Completed</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="px-6 mb-6">
            <TouchableOpacity 
              className="bg-red-100 p-4 rounded-xl flex-row items-center"
            >
              <View className="bg-red-500 p-2 rounded-full mr-3">
                <Feather name="phone" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">Emergency Assistance</Text>
                <Text className="text-gray-600 text-sm">Call for immediate roadside help</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#D92C2C" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className="flex-row border-t border-gray-200 px-6 py-3">
          <TouchableOpacity 
            className="flex-1 items-center"
            onPress={() => setActiveTab("home")}
          >
            <Feather name="home" size={24} color={activeTab === "home" ? "#D92C2C" : "#6B7280"} />
            <Text className={`text-xs mt-1 ${activeTab === "home" ? "text-[#D92C2C]" : "text-gray-500"}`}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 items-center"
            onPress={() => router.push("/driver/ServiceHistoryScreen")}
          >
            <Feather name="clock" size={24} color={activeTab === "history" ? "#D92C2C" : "#6B7280"} />
            <Text className={`text-xs mt-1 ${activeTab === "history" ? "text-[#D92C2C]" : "text-gray-500"}`}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 items-center"
            onPress={() => router.push("/driver/ServiceRequestScreen")}
          >
            <View className="bg-[#D92C2C] w-14 h-14 rounded-full items-center justify-center -mt-8">
              <Feather name="plus" size={24} color="white" />
            </View>
            <Text className="text-xs mt-1 text-[#D92C2C]">Request</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 items-center"
            onPress={() => router.push("/driver/NotificationScreen")}
          >
            <Feather name="bell" size={24} color={activeTab === "notification" ? "#D92C2C" : "#6B7280"} />
            <Text className={`text-xs mt-1 ${activeTab === "notification" ? "text-[#D92C2C]" : "text-gray-500"}`}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 items-center"
            onPress={() => router.push("/driver/ProfileScreen")}
          >
            <Feather name="user" size={24} color={activeTab === "profile" ? "#D92C2C" : "#6B7280"} />
            <Text className={`text-xs mt-1 ${activeTab === "profile" ? "text-[#D92C2C]" : "text-gray-500"}`}>Profile</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

interface ServiceCardProps {
  icon: "home" | "disc" | "zap" | "truck" | "droplet" | "link" | "search" | "image" | "menu" | "radio" | "minus" | "plus" | "info" | "check" | "book" | "pause" | "frown" | "mail" | "star" | "phone-call" | "map-pin";
  title: string;
  onPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity 
      className="w-[80px] items-center" 
      onPress={onPress}
    >
      <View className="bg-[#D92C2C]/10 w-[60px] h-[60px] rounded-full items-center justify-center mb-2">
        <Feather name={icon} size={24} color="#D92C2C" />
      </View>
      <Text className="text-gray-800 text-sm text-center">{title}</Text>
    </TouchableOpacity>
  );
};