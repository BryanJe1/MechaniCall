import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Dimensions, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function MechanicDashboard() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [activeTab, setActiveTab] = useState("requests");
  
  const [region, setRegion] = useState({
  latitude: 12.9739,
  longitude: 124.0076,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
});

  
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: "r1",
      service: "Flat Tire",
      customer: "Sample Customer 1",
      distance: "1.2 km",
      time: "5 min ago",
      earnings: "₱500.00",
      status: "pending",
      location: {
        latitude: 12.981747,
        longitude:  123.975618,
      },
    },
    {
      id: "r2",
      service: "Jump Start",
      customer: "Sample Customer 2",
      distance: "2.5 km",
      time: "12 min ago",
      earnings: "₱700.00",
      status: "pending",
      location: {
        latitude: 12.982416,
        longitude: 123.944548,
      },
    },
  ]);
  
  const [activeRequests, setActiveRequests] = useState([
    {
      id: "a1",
      service: "Towing",
      customer: "Sample Customer 3",
      distance: "0.8 km",
      time: "In progress",
      earnings: "₱1000.00",
      status: "in_progress",
      location: {
        latitude: 12.979238,
        longitude: 123.984030,
      },
    },
  ]);
  
  const [completedRequests, setCompletedRequests] = useState([
    {
      id: "c1",
      service: "Fuel Delivery",
      customer: "Sample Customer 4",
      distance: "Completed",
      time: "Today, 10:30 AM",
      earnings: "₱100.00",
      status: "completed",
    },
    {
      id: "c2",
      service: "Lockout",
      customer: "Sample Customer 5",
      distance: "Completed",
      time: "Yesterday, 3:15 PM",
      earnings: "₱100.00",
      status: "completed",
    },
  ]);
  
  const [todayEarnings, setTodayEarnings] = useState(100.00);
  const [weekEarnings, setWeekEarnings] = useState(200.00);
  
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };
  
  const handleAcceptRequest = (requestId: string) => {
    const request = serviceRequests.find(req => req.id === requestId);
    if (request) {
      setServiceRequests(prev => prev.filter(req => req.id !== requestId));
      setActiveRequests(prev => [...prev, { ...request, status: "accepted" }]);
      router.push({ pathname: "/mechanic/ServiceRequestDetailScreen", params: { id: requestId } });
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

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
<View className="px-6 pt-4 pb-6">
  <View className="flex-row justify-between items-center">
    <View>
      <Text className="text-white text-2xl font-bold">Mechanic Dashboard</Text>
      <Text className="text-white/90 mt-1">
        {isOnline ? "You're online and available" : "You're offline"}
      </Text>
    </View>
    
    <View className="flex-row items-center">
      <TouchableOpacity 
        className="bg-white/20 p-2 rounded-full mr-3"
        onPress={() => router.push("/mechanic/NotificationScreen")}
      >
        {unreadNotifications > 0 && (
          <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center z-10">
            <Text className="text-white text-xs font-bold">
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </Text>
          </View>
        )}
        <Feather name="bell" size={22} color="white" />
      </TouchableOpacity>
      <View className="flex-row items-center">
        <Text className="text-white mr-2">{isOnline ? "Online" : "Offline"}</Text>
        <Switch
          trackColor={{ false: "#E5E7EB", true: "#F87171" }}
          thumbColor={isOnline ? "#fff" : "#D1D5DB"}
          ios_backgroundColor="#E5E7EB"
          onValueChange={toggleOnlineStatus}
          value={isOnline}
        />
      </View>
    </View>
  </View>
</View>
      <View className="flex-1 bg-white rounded-t-[30px]">
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="flex-row justify-between mx-6 mt-6 mb-4"
        >
          <View className="bg-[#D92C2C]/10 p-4 rounded-xl flex-1 mr-2">
            <Text className="text-gray-700">Today's Earnings</Text>
            <Text className="text-xl font-bold text-[#D92C2C]">₱{todayEarnings.toFixed(2)}</Text>
          </View>
          
          <View className="bg-gray-100 p-4 rounded-xl flex-1 ml-2">
            <Text className="text-gray-700">This Week</Text>
            <Text className="text-xl font-bold">₱{weekEarnings.toFixed(2)}</Text>
          </View>
        </Animated.View>
        
        {/* Tabs */}
        <View className="flex-row border-b border-gray-200">
          <TouchableOpacity 
            className={`flex-1 py-4 items-center ${activeTab === 'requests' ? 'border-b-2 border-[#D92C2C]' : ''}`}
            onPress={() => setActiveTab('requests')}
          >
            <Text className={`font-medium ${activeTab === 'requests' ? 'text-[#D92C2C]' : 'text-gray-600'}`}>
              New Requests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-4 items-center ${activeTab === 'active' ? 'border-b-2 border-[#D92C2C]' : ''}`}
            onPress={() => setActiveTab('active')}
          >
            <Text className={`font-medium ${activeTab === 'active' ? 'text-[#D92C2C]' : 'text-gray-600'}`}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-4 items-center ${activeTab === 'completed' ? 'border-b-2 border-[#D92C2C]' : ''}`}
            onPress={() => setActiveTab('completed')}
          >
            <Text className={`font-medium ${activeTab === 'completed' ? 'text-[#D92C2C]' : 'text-gray-600'}`}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-4 items-center ${activeTab === 'map' ? 'border-b-2 border-[#D92C2C]' : ''}`}
            onPress={() => setActiveTab('map')}
          >
            <Text className={`font-medium ${activeTab === 'map' ? 'text-[#D92C2C]' : 'text-gray-600'}`}>
              Map
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'requests' && (
          <ScrollView className="flex-1 px-6 pt-4">
            <Animated.View entering={FadeInDown.delay(300).springify()}>
              {serviceRequests.length > 0 ? (
                serviceRequests.map((request) => (
                  <View 
                    key={request.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
                  >
                    <View className="flex-row items-center mb-3">
                      <View className="bg-[#D92C2C]/10 p-2 rounded-full mr-3">
                        <Feather name={getServiceIcon(request.service)} size={20} color="#D92C2C" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-gray-800">{request.service}</Text>
                        <Text className="text-gray-600">{request.customer}</Text>
                      </View>
                      <Text className="font-bold text-[#D92C2C]">{request.earnings}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center">
                        <Feather name="map-pin" size={14} color="#6B7280" />
                        <Text className="text-gray-600 ml-1">{request.distance}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Feather name="clock" size={14} color="#6B7280" />
                        <Text className="text-gray-600 ml-1">{request.time}</Text>
                      </View>
                    </View>
                    <View className="flex-row">
                      <TouchableOpacity 
                        className="bg-[#D92C2C] rounded-full py-2 px-4 flex-1 items-center mr-2"
                        onPress={() => handleAcceptRequest(request.id)}
                      >
                        <Text className="text-white font-medium">Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        className="bg-gray-100 rounded-full py-2 px-4 flex-1 items-center ml-2"
                        onPress={() => router.push({ pathname: "/mechanic/ServiceRequestDetailScreen", params: { id: request.id } })}
                      >
                        <Text className="text-gray-700 font-medium">Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View className="items-center justify-center py-20">
                  <Feather name="inbox" size={60} color="#D1D5DB" />
                  <Text className="text-gray-400 mt-4 text-lg">No new requests</Text>
                  <Text className="text-gray-400 text-center mt-2">
                    New service requests will appear here
                  </Text>
                </View>
              )}
            </Animated.View>
          </ScrollView>
        )}
        {activeTab === 'active' && (
          <ScrollView className="flex-1 px-6 pt-4">
            <Animated.View entering={FadeInDown.delay(300).springify()}>
              {activeRequests.length > 0 ? (
                activeRequests.map((request) => (
                  <View 
                    key={request.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
                  >
                    <View className="flex-row items-center mb-3">
                      <View className="bg-[#D92C2C]/10 p-2 rounded-full mr-3">
                        <Feather name={getServiceIcon(request.service)} size={20} color="#D92C2C" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-gray-800">{request.service}</Text>
                        <Text className="text-gray-600">{request.customer}</Text>
                      </View>
                      <Text className="font-bold text-[#D92C2C]">{request.earnings}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center">
                        <Feather name="map-pin" size={14} color="#6B7280" />
                        <Text className="text-gray-600 ml-1">{request.distance}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Feather name="clock" size={14} color="#6B7280" />
                        <Text className="text-gray-600 ml-1">{request.time}</Text>
                      </View>
                    </View>
                    <View className="bg-blue-100 rounded-full py-2 px-4 items-center mb-3">
                      <Text className="text-blue-800 font-medium">In Progress</Text>
                    </View>
                    <View className="flex-row mt-2">
                      <TouchableOpacity 
                        className="bg-[#D92C2C] rounded-full py-2 px-4 flex-1 items-center mr-2"
                        onPress={() => router.push({ pathname: "/mechanic/RouteNavigationScreen", params: { id: request.id } })}
                      >
                        <Text className="text-white font-medium">Navigate</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        className="bg-green-600 rounded-full py-2 px-4 flex-1 items-center ml-2"
                        onPress={() => router.push({ pathname: "/mechanic/MarkCompletedScreen", params: { id: request.id } })}
                      >
                        <Text className="text-white font-medium">Mark Complete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View className="items-center justify-center py-20">
                  <Feather name="activity" size={60} color="#D1D5DB" />
                  <Text className="text-gray-400 mt-4 text-lg">No active requests</Text>
                  <Text className="text-gray-400 text-center mt-2">
                    Your active service requests will appear here
                  </Text>
                </View>
              )}
            </Animated.View>
          </ScrollView>
        )}
        {activeTab === 'completed' && (
          <ScrollView className="flex-1 px-6 pt-4">
            <Animated.View entering={FadeInDown.delay(300).springify()}>
              {completedRequests.length > 0 ? (
                completedRequests.map((request) => (
                  <TouchableOpacity 
                    key={request.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
                    onPress={() => router.push({ pathname: "/mechanic/ServiceRequestDetailScreen", params: { id: request.id } })}
                  >
                    <View className="flex-row items-center mb-3">
                      <View className="bg-[#D92C2C]/10 p-2 rounded-full mr-3">
                        <Feather name={getServiceIcon(request.service)} size={20} color="#D92C2C" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-gray-800">{request.service}</Text>
                        <Text className="text-gray-600">{request.customer}</Text>
                      </View>
                      <Text className="font-bold text-[#D92C2C]">{request.earnings}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center">
                        <Feather name="check-circle" size={14} color="#10B981" />
                        <Text className="text-gray-600 ml-1">{request.distance}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Feather name="clock" size={14} color="#6B7280" />
                        <Text className="text-gray-600 ml-1">{request.time}</Text>
                      </View>
                    </View>
                    <View className="bg-green-100 rounded-full py-2 px-4 items-center">
                      <Text className="text-green-800 font-medium">Completed</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View className="items-center justify-center py-20">
                  <Feather name="check-circle" size={60} color="#D1D5DB" />
                  <Text className="text-gray-400 mt-4 text-lg">No completed requests</Text>
                  <Text className="text-gray-400 text-center mt-2">
                    Your completed service requests will appear here
                  </Text>
                </View>
              )}
            </Animated.View>
          </ScrollView>
        )}
        {activeTab === 'map' && (
          <View className="flex-1">
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ flex: 1 }}
              region={region}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              <Marker
                coordinate={{
                  latitude: 12.972107,
                  longitude: 123.990317,
                }}
                title="Your Location"
                description="You are here"
              >
                <View className="bg-[#D92C2C] p-2 rounded-full border-2 border-white">
                  <Feather name="tool" size={16} color="white" />
                </View>
              </Marker>
              {serviceRequests.map((request) => (
                <Marker
                  key={request.id}
                  coordinate={request.location}
                  title={request.service}
                  description={`${request.customer} - ${request.distance}`}
                  onCalloutPress={() => router.push({ pathname: "/mechanic/ServiceRequestDetailScreen", params: { id: request.id } })}
                >
                  <View className="bg-white p-2 rounded-full border-2 border-[#D92C2C]">
                    <Feather name={getServiceIcon(request.service)} size={16} color="#D92C2C" />
                  </View>
                </Marker>
              ))}
              {activeRequests.map((request) => (
                <Marker
                  key={request.id}
                  coordinate={request.location}
                  title={request.service}
                  description={`${request.customer} - In Progress`}
                  onCalloutPress={() => router.push({ pathname: "/mechanic/ServiceRequestDetailScreen", params: { id: request.id } })}
                >
                  <View className="bg-blue-500 p-2 rounded-full border-2 border-white">
                    <Feather name={getServiceIcon(request.service)} size={16} color="white" />
                  </View>
                </Marker>
              ))}
            </MapView>
            <View className="absolute bottom-4 left-4 right-4">
              <View className="bg-white rounded-xl shadow-md p-4">
                <Text className="font-bold text-gray-800 mb-2">Service Area</Text>
                <Text className="text-gray-600 mb-3">You're currently available in Sorsogon City Philippines</Text>
                <TouchableOpacity 
                  className="bg-[#D92C2C] rounded-full py-3 items-center"
                  onPress={() => router.push("/mechanic/AvailabilityToggleScreen")}
                >
                  <Text className="text-white font-medium">Adjust Availability</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
      <View className="bg-white border-t border-gray-200 px-4 py-2 flex-row justify-around">
        <TouchableOpacity 
          className="items-center py-2" 
          onPress={() => setActiveTab('requests')}
        >
          <Feather 
            name="clipboard" 
            size={24} 
            color={activeTab === 'requests' ? "#D92C2C" : "#6B7280"} 
          />
          <Text className={`text-xs mt-1 ${activeTab === 'requests' ? 'text-[#D92C2C]' : 'text-gray-500'}`}>
            Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="items-center py-2" 
          onPress={() => setActiveTab('map')}
        >
          <Feather 
            name="map" 
            size={24} 
            color={activeTab === 'map' ? "#D92C2C" : "#6B7280"} 
          />
          <Text className={`text-xs mt-1 ${activeTab === 'map' ? 'text-[#D92C2C]' : 'text-gray-500'}`}>
            Map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="items-center py-2"
          onPress={() => router.push("/mechanic/EarningSummaryScreen")}
        >
          <Feather name="dollar-sign" size={24} color="#6B7280" />
          <Text className="text-xs mt-1 text-gray-500">Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="items-center py-2"
          onPress={() => router.push("/mechanic/ProfileScreen")}
        >
          <Feather name="user" size={24} color="#6B7280" />
          <Text className="text-xs mt-1 text-gray-500">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}