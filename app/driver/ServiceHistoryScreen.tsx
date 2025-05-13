import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ServiceHistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  
  const services = [
    {
      id: "s1",
      type: "Flat Tire",
      date: "April 26, 2025",
      time: "10:30 AM",
      mechanic: {
        id: "m1",
        name: "Sample Mechanic 1",
        business: "Sample Mechanic 1's Auto Repair",
      },
      status: "completed",
      amount: 500.00,
    },
    {
      id: "s2",
      type: "Jump Start",
      date: "April 22, 2023",
      time: "02:15 PM",
      mechanic: {
        id: "m2",
        name: "Sample Mechanic 2",
        business: "Quick Fix Auto",
      },
      status: "completed",
      amount: 100.00,
    },
    {
      id: "s3",
      type: "Towing",
      date: "March 10, 2025",
      time: "08:45 AM",
      mechanic: {
        id: "m3",
        name: "Sample Mechanic 3",
        business: "Roadside Heroes",
      },
      status: "completed",
      amount: 1000.00,
    },
    {
      id: "s4",
      type: "Fuel Delivery",
      date: "February 5, 2025",
      time: "11:20 AM",
      mechanic: {
        id: "m1",
        name: "Sample Mechanic 1",
        business: "Sample Mechanic 1's Auto Repair",
      },
      status: "completed",
      amount: 100.00,
    },
  ];
  
  const getFilteredServices = () => {
    if (activeTab === "all") return services;
    return services.filter(service => {
      const serviceDate = new Date(service.date);
      const now = new Date();
      
      if (activeTab === "this-month") {
        return serviceDate.getMonth() === now.getMonth() && 
               serviceDate.getFullYear() === now.getFullYear();
      }
      
      if (activeTab === "last-month") {
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        return serviceDate.getMonth() === lastMonth && 
               serviceDate.getFullYear() === lastMonthYear;
      }
      
      return true;
    });
  };
  
  const getServiceIcon = (type: string) => {
    switch(type) {
      case "Flat Tire": return "disc";
      case "Jump Start": return "zap";
      case "Towing": return "truck";
      case "Fuel Delivery": return "droplet";
      default: return "tool";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="pt-4 pb-6 px-6">
        <TouchableOpacity 
          className="absolute top-4 left-6 z-10"
          onPress={() => router.push("/driver/DriverDashboard")}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          <Text className="text-white text-3xl font-bold">Service History</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <View className="flex-row p-4 border-b border-gray-200">
          <TouchableOpacity 
            className={`flex-1 py-2 rounded-full ${activeTab === "all" ? "bg-[#D92C2C]" : "bg-transparent"}`}
            onPress={() => setActiveTab("all")}
          >
            <Text className={`text-center font-medium ${activeTab === "all" ? "text-white" : "text-gray-600"}`}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-2 rounded-full ${activeTab === "this-month" ? "bg-[#D92C2C]" : "bg-transparent"}`}
            onPress={() => setActiveTab("this-month")}
          >
            <Text className={`text-center font-medium ${activeTab === "this-month" ? "text-white" : "text-gray-600"}`}>
              This Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-2 rounded-full ${activeTab === "last-month" ? "bg-[#D92C2C]" : "bg-transparent"}`}
            onPress={() => setActiveTab("last-month")}
          >
            <Text className={`text-center font-medium ${activeTab === "last-month" ? "text-white" : "text-gray-600"}`}>
              Last Month
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={getFilteredServices()}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-8">
              <Feather name="calendar" size={48} color="#D1D5DB" />
              <Text className="text-gray-400 mt-4 text-center">No service history found</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
              onPress={() => router.push({ pathname: "/driver/ServiceDetailScreen", params: { id: item.id } })}
            >
              <View className="flex-row items-center">
                <View className="bg-[#D92C2C]/10 p-3 rounded-full mr-3">
                  <Feather name={getServiceIcon(item.type)} size={22} color="#D92C2C" />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between">
                    <Text className="font-bold text-gray-800">{item.type}</Text>
                    <Text className="font-bold text-gray-800">₱{item.amount.toFixed(2)}</Text>
                  </View>
                  <View className="flex-row justify-between mt-1">
                    <Text className="text-gray-600">
                      {item.date} • {item.time}
                    </Text>
                    <View className="bg-green-100 px-2 py-0.5 rounded">
                      <Text className="text-green-700 text-xs font-medium">Completed</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center mt-2">
                    <View className="bg-gray-100 w-5 h-5 rounded-full mr-2 items-center justify-center">
                      <Feather name="user" size={12} color="#6B7280" />
                    </View>
                    <Text className="text-gray-600 text-sm">{item.mechanic.name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </SafeAreaView>
  );
}