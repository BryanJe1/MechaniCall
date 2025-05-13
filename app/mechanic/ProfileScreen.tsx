import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilesScreen() {
  const router = useRouter();
  const [userType, setUserType] = useState("mechanic");
  
  const [name, setName] = useState("Sample Account");
  const [email, setEmail] = useState("SampleAccount@google.com");
  const [phone, setPhone] = useState("+639 123 456 7890");
  
  const [vehicleMake, setVehicleMake] = useState("Toyota");
  const [vehicleModel, setVehicleModel] = useState("Camry");
  const [vehicleYear, setVehicleYear] = useState("2020");
  const [licensePlate, setLicensePlate] = useState("ABC123");
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  const [savedCards, setSavedCards] = useState([
    { id: "card1", last4: "4242", brand: "Master", expiry: "05/25" }
  ]);
  
  const handleSaveChanges = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }
    
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    
    if (!phone.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }
    
    Alert.alert(
      "Success", 
      "Your profile has been updated successfully.",
      [{ text: "OK" }]
    );
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Logout", 
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => router.replace("/auth/LoginScreen") }
      ]
    );
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
          <Text className="text-white text-3xl font-bold">Profile Settings</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px] px-6 pt-8"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="items-center mb-6">
            <View className="bg-gray-200 w-24 h-24 rounded-full items-center justify-center">
              <Feather name="user" size={40} color="#9CA3AF" />
            </View>
            <TouchableOpacity className="mt-2">
              <Text className="text-[#D92C2C] font-medium">Change Photo</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-bold mb-4">Personal Information</Text>
          <Text className="text-gray-700 font-medium mb-2 ml-1">Full Name</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <Feather name="user" size={20} color="#888" />
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <Text className="text-gray-700 font-medium mb-2 ml-1">Email</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <Feather name="mail" size={20} color="#888" />
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <Text className="text-gray-700 font-medium mb-2 ml-1">Phone Number</Text>
          <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-6">
            <Feather name="phone" size={20} color="#888" />
            <TextInput
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              className="flex-1 ml-3 text-gray-800"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
          {userType === "driver" && (
            <>
              <Text className="text-lg font-bold mb-4">Vehicle Information</Text>
              <View className="flex-row mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-700 font-medium mb-2 ml-1">Make</Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                    <Feather name="truck" size={20} color="#888" />
                    <TextInput
                      placeholder="Vehicle make"
                      value={vehicleMake}
                      onChangeText={setVehicleMake}
                      className="flex-1 ml-3 text-gray-800"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-gray-700 font-medium mb-2 ml-1">Model</Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                    <TextInput
                      placeholder="Vehicle model"
                      value={vehicleModel}
                      onChangeText={setVehicleModel}
                      className="flex-1 text-gray-800"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>
              </View>
              <View className="flex-row mb-6">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-700 font-medium mb-2 ml-1">Year</Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                    <Feather name="calendar" size={20} color="#888" />
                    <TextInput
                      placeholder="Vehicle year"
                      value={vehicleYear}
                      onChangeText={setVehicleYear}
                      className="flex-1 ml-3 text-gray-800"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-gray-700 font-medium mb-2 ml-1">License Plate</Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                    <TextInput
                      placeholder="License plate"
                      value={licensePlate}
                      onChangeText={setLicensePlate}
                      className="flex-1 text-gray-800"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="characters"
                    />
                  </View>
                </View>
              </View>
            </>
          )}
          <Text className="text-lg font-bold mb-4">Notification Settings</Text>
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <View className="flex-row items-center">
                <Feather name="bell" size={20} color="#6B7280" />
                <Text className="text-gray-800 ml-3">Push Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: "#E5E7EB", true: "#F87171" }}
                thumbColor={pushNotifications ? "#D92C2C" : "#fff"}
                ios_backgroundColor="#E5E7EB"
                onValueChange={setPushNotifications}
                value={pushNotifications}
              />
            </View>
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <View className="flex-row items-center">
                <Feather name="mail" size={20} color="#6B7280" />
                <Text className="text-gray-800 ml-3">Email Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: "#E5E7EB", true: "#F87171" }}
                thumbColor={emailNotifications ? "#D92C2C" : "#fff"}
                ios_backgroundColor="#E5E7EB"
                onValueChange={setEmailNotifications}
                value={emailNotifications}
              />
            </View>
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <Feather name="message-circle" size={20} color="#6B7280" />
                <Text className="text-gray-800 ml-3">SMS Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: "#E5E7EB", true: "#F87171" }}
                thumbColor={smsNotifications ? "#D92C2C" : "#fff"}
                ios_backgroundColor="#E5E7EB"
                onValueChange={setSmsNotifications}
                value={smsNotifications}
              />
            </View>
          </View>
          <Text className="text-lg font-bold mb-4">Payment Information</Text>
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            {savedCards.map((card) => (
              <View key={card.id} className="flex-row items-center justify-between py-3 border-b border-gray-200">
                <View className="flex-row items-center">
                  <Feather name="credit-card" size={20} color="#6B7280" />
                  <View className="ml-3">
                    <Text className="text-gray-800">{card.brand} •••• {card.last4}</Text>
                    <Text className="text-gray-500 text-sm">Expires {card.expiry}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Feather name="trash-2" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity className="flex-row items-center justify-center mt-3">
              <Feather name="plus" size={20} color="#D92C2C" />
              <Text className="text-[#D92C2C] font-medium ml-2">Add Payment Method</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-bold mb-4">Security</Text>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Feather name="lock" size={20} color="#6B7280" />
              <Text className="text-gray-800 ml-3">Change Password</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Feather name="shield" size={20} color="#6B7280" />
              <Text className="text-gray-800 ml-3">Two-Factor Authentication</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-center py-3 mt-6 mb-8"
            onPress={handleLogout}
          >
            <Feather name="log-out" size={20} color="#EF4444" />
            <Text className="text-[#EF4444] font-medium ml-2">Logout</Text>
          </TouchableOpacity>
        </ScrollView>
        <View className="py-6">
          <TouchableOpacity
            className="bg-[#D92C2C] rounded-full py-4 items-center"
            onPress={handleSaveChanges}
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-lg">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}