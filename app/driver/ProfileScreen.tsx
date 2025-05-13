import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const user = {
    id: "u1",
    name: "Sample Account",
    email: "SampleAccount@google.com",
    phone: "+639 123 456 7890",
    vehicles: [
      {
        id: "v1",
        make: "Toyota",
        model: "Camry",
        year: "2018",
        licensePlate: "ABC123",
      },
      {
        id: "v2",
        make: "Honda",
        model: "Civic",
        year: "2020",
        licensePlate: "XYZ789",
      },
    ],
    paymentMethods: [
      {
        id: "p1",
        type: "Credit Card",
        last4: "4567",
        isDefault: true,
      },
      {
        id: "p2",
        type: "Gcash",
        email: "+639 123 456 7890",
        isDefault: false,
      },
    ],
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            router.replace("/auth/LoginScreen");
          },
        },
      ],
      { cancelable: true }
    );
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
          <Text className="text-white text-3xl font-bold">Profile</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView className="flex-1">
          <View className="p-6 items-center border-b border-gray-200">
            <View className="bg-[#D92C2C]/10 p-6 rounded-full mb-4">
              <Feather name="user" size={40} color="#D92C2C" />
            </View>
            <Text className="text-2xl font-bold text-gray-800">{user.name}</Text>
            <Text className="text-gray-600">{user.email}</Text>
            <Text className="text-gray-600">{user.phone}</Text>
            <TouchableOpacity 
              className="mt-4 bg-[#D92C2C]/10 py-2 px-4 rounded-full"
            >
              <Text className="text-[#D92C2C] font-medium">Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View className="p-6 border-b border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">My Vehicles</Text>
              <TouchableOpacity>
                <Text className="text-[#D92C2C] font-medium">Add New</Text>
              </TouchableOpacity>
            </View>
            {user.vehicles.map((vehicle) => (
              <TouchableOpacity 
                key={vehicle.id}
                className="bg-gray-50 rounded-xl p-4 mb-3"
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View className="bg-[#D92C2C]/10 p-2 rounded-full mr-3">
                      <Feather name="truck" size={20} color="#D92C2C" />
                    </View>
                    <View>
                      <Text className="font-bold text-gray-800">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </Text>
                      <Text className="text-gray-600">
                        License: {vehicle.licensePlate}
                      </Text>
                    </View>
                  </View>
                  <Feather name="chevron-right" size={20} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="p-6 border-b border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">Payment Methods</Text>
              <TouchableOpacity>
                <Text className="text-[#D92C2C] font-medium">Add New</Text>
              </TouchableOpacity>
            </View>
            {user.paymentMethods.map((payment) => (
              <TouchableOpacity 
                key={payment.id}
                className="bg-gray-50 rounded-xl p-4 mb-3"
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View className="bg-[#D92C2C]/10 p-2 rounded-full mr-3">
                      <Feather 
                        name={payment.type === "Credit Card" ? "credit-card" : "dollar-sign"} 
                        size={20} 
                        color="#D92C2C" 
                      />
                    </View>
                    <View>
                      <Text className="font-bold text-gray-800">
                        {payment.type}
                      </Text>
                      {payment.last4 && (
                        <Text className="text-gray-600">
                          **** **** **** {payment.last4}
                        </Text>
                      )}
                      {payment.email && (
                        <Text className="text-gray-600">
                          {payment.email}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    {payment.isDefault && (
                      <View className="bg-green-100 px-2 py-1 rounded mr-2">
                        <Text className="text-green-700 text-xs font-medium">Default</Text>
                      </View>
                    )}
                    <Feather name="chevron-right" size={20} color="#9CA3AF" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="p-6 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-800 mb-4">Notifications</Text>
            
            <View className="bg-gray-50 rounded-xl p-4">
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-gray-800">Push Notifications</Text>
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: "#E5E7EB", true: "#FECACA" }}
                  thumbColor={pushNotifications ? "#D92C2C" : "#A1A1AA"}
                />
              </View>
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-gray-800">Email Notifications</Text>
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                  trackColor={{ false: "#E5E7EB", true: "#FECACA" }}
                  thumbColor={emailNotifications ? "#D92C2C" : "#A1A1AA"}
                />
              </View>
              <TouchableOpacity 
                className="mt-2"
              >
                <Text className="text-[#D92C2C] font-medium">More Preferences</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="p-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Settings</Text>
            <View className="space-y-3">
              <SettingsOption 
                icon="help-circle"
                title="Help & Support" 
                onPress={() => {}} 
              />
              <SettingsOption 
                icon="file-text" 
                title="Terms of Service" 
                onPress={() => {}} 
              />
              <SettingsOption 
                icon="shield" 
                title="Privacy Policy" 
                onPress={() => {}} 
              />
              <SettingsOption 
                icon="info" 
                title="About" 
                onPress={() => {}} 
              />
              <SettingsOption 
                icon="log-out" 
                title="Logout" 
                color="#F87171"
                onPress={handleLogout} 
              />
            </View>
            <Text className="text-center text-gray-400 mt-8">Version 1.0.0</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

// Settings Option Component

interface SettingsOptionProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  color?: string;
  onPress: () => void;
}

const SettingsOption = ({ icon, title, color = "#6B7280", onPress }: SettingsOptionProps) => {
  return (
    <TouchableOpacity 
      className="flex-row items-center bg-gray-50 p-4 rounded-xl"
      onPress={onPress}
    >
      <Feather name={icon} size={22} color={color} className="mr-3" />
      <Text className="flex-1 font-medium" style={{ color }}>
        {title}
      </Text>
      <Feather name="chevron-right" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
};