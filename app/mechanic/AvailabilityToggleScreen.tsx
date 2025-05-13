import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AvailabilityToggleScreen() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  
  const [workingHours, setWorkingHours] = useState([
    { day: "Monday", active: true, start: "9:00 AM", end: "5:00 PM" },
    { day: "Tuesday", active: true, start: "9:00 AM", end: "5:00 PM" },
    { day: "Wednesday", active: true, start: "9:00 AM", end: "5:00 PM" },
    { day: "Thursday", active: true, start: "9:00 AM", end: "5:00 PM" },
    { day: "Friday", active: true, start: "9:00 AM", end: "5:00 PM" },
    { day: "Saturday", active: false, start: "10:00 AM", end: "4:00 PM" },
    { day: "Sunday", active: false, start: "10:00 AM", end: "4:00 PM" },
  ]);
  
  const [serviceArea, setServiceArea] = useState({
    radius: 10,
    location: "Sorsogon City Philippines",
  });
  
  const [autoAccept, setAutoAccept] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  
  const toggleDayActive = (day: string) => {
    setWorkingHours(prev => 
      prev.map(item => 
        item.day === day ? { ...item, active: !item.active } : item
      )
    );
  };
  
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
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
          <Text className="text-white text-3xl font-bold">Availability</Text>
          <Text className="text-white/80 text-base mt-2 text-center">
            Manage your working hours
          </Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="p-6 border-b border-gray-200">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-bold">Online Status</Text>
                <Text className="text-gray-600 mt-1">
                  {isOnline ? "You're available for service requests" : "You're offline"}
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#E5E7EB", true: "#F87171" }}
                thumbColor={isOnline ? "#D92C2C" : "#fff"}
                ios_backgroundColor="#E5E7EB"
                onValueChange={toggleOnlineStatus}
                value={isOnline}
              />
            </View>
            {isOnline && (
              <View className="mt-4 bg-green-50 p-4 rounded-xl">
                <Text className="text-green-800">
                  You're online and will receive service requests based on your settings.
                </Text>
              </View>
            )}
            {!isOnline && (
              <View className="mt-4 bg-gray-50 p-4 rounded-xl">
                <Text className="text-gray-800">
                  You're offline and won't receive any service requests.
                </Text>
              </View>
            )}
          </View>
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-bold mb-4">Working Hours</Text>
            {workingHours.map((item) => (
              <View 
                key={item.day} 
                className="flex-row items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
              >
                <View className="flex-1">
                  <Text className="font-medium">{item.day}</Text>
                  {item.active && (
                    <Text className="text-gray-600">{item.start} - {item.end}</Text>
                  )}
                  {!item.active && (
                    <Text className="text-gray-400">Not Available</Text>
                  )}
                </View>
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#F87171" }}
                  thumbColor={item.active ? "#D92C2C" : "#fff"}
                  ios_backgroundColor="#E5E7EB"
                  onValueChange={() => toggleDayActive(item.day)}
                  value={item.active}
                />
              </View>
            ))}
            <TouchableOpacity className="flex-row items-center mt-4">
              <Feather name="edit" size={16} color="#D92C2C" />
              <Text className="text-[#D92C2C] font-medium ml-2">Edit Working Hours</Text>
            </TouchableOpacity>
          </View>
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-bold mb-4">Service Area</Text>
            <View className="bg-gray-50 rounded-xl p-4 mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-700">Current Location</Text>
                <Text className="font-medium">{serviceArea.location}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-700">Service Radius</Text>
                <Text className="font-medium">{serviceArea.radius} km</Text>
              </View>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <Feather name="map-pin" size={16} color="#D92C2C" />
              <Text className="text-[#D92C2C] font-medium ml-2">Update Service Area</Text>
            </TouchableOpacity>
          </View>
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-bold mb-4">Additional Settings</Text>
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <View>
                <Text className="font-medium">Auto-Accept Requests</Text>
                <Text className="text-gray-600 text-sm">Automatically accept service requests</Text>
              </View>
              <Switch
                trackColor={{ false: "#E5E7EB", true: "#F87171" }}
                thumbColor={autoAccept ? "#D92C2C" : "#fff"}
                ios_backgroundColor="#E5E7EB"
                onValueChange={() => setAutoAccept(!autoAccept)}
                value={autoAccept}
              />
            </View>
            <View className="flex-row items-center justify-between py-3">
              <View>
                <Text className="font-medium">Break Time</Text>
                <Text className="text-gray-600 text-sm">Set a temporary break without going offline</Text>
              </View>
              <Switch
                trackColor={{ false: "#E5E7EB", true: "#F87171" }}
                thumbColor={breakTime ? "#D92C2C" : "#fff"}
                ios_backgroundColor="#E5E7EB"
                onValueChange={() => setBreakTime(!breakTime)}
                value={breakTime}
              />
            </View>
            {breakTime && (
              <View className="mt-3 bg-yellow-50 p-4 rounded-xl">
                <Text className="text-yellow-800">
                  You're on a break. You won't receive new requests until your break ends.
                </Text>
                <TouchableOpacity className="mt-2">
                  <Text className="text-[#D92C2C] font-medium">Set Break Duration</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View className="p-6">
            <TouchableOpacity
              className="bg-[#D92C2C] rounded-full py-4 items-center mb-4"
              onPress={() => router.push("/mechanic/MechanicDashboard")}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">Save Settings</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}