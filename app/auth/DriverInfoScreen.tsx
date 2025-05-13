import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverInfoScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [color, setColor] = useState("");
  
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  
  const handleNext = () => {
    if (currentStep === 1) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        Alert.alert("Error", "Please fill in all personal information fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!vehicleMake.trim() || !vehicleModel.trim() || !vehicleYear.trim() || !licensePlate.trim()) {
        Alert.alert("Error", "Please fill in all required vehicle information fields");
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      Alert.alert(
        "Success", 
        "Your driver profile has been created successfully!",
        [{ text: "Continue", onPress: () => router.replace("/auth/LoginScreen") }]
      );
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#D92C2C]">
      <StatusBar style="light" />
      <View className="pt-10 pb-6 px-6">
        <TouchableOpacity 
          className="absolute top-10 left-6 z-10"
          onPress={handleBack}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          <Text className="text-white text-3xl font-bold">Driver Profile</Text>
          <Text className="text-white/80 text-base mt-2 text-center">
            Step {currentStep} of {totalSteps}
          </Text>
        </Animated.View>
      </View>
      <View className="flex-1 bg-white rounded-t-[30px] px-6 pt-8">
        <View className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <View 
            className="h-2 bg-[#D92C2C] rounded-full" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {currentStep === 1 && (
            <Animated.View entering={FadeInDown.duration(300)}>
              <Text className="text-xl font-bold text-gray-800 mb-4">Personal Information</Text>
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
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
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
            </Animated.View>
          )}
          {currentStep === 2 && (
            <Animated.View entering={FadeInDown.duration(300)}>
              <Text className="text-xl font-bold text-gray-800 mb-4">Vehicle Information</Text>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Vehicle Brand</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="truck" size={20} color="#888" />
                <TextInput
                  placeholder="e.g., Toyota, Honda, Ford"
                  value={vehicleMake}
                  onChangeText={setVehicleMake}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Vehicle Model</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="info" size={20} color="#888" />
                <TextInput
                  placeholder="e.g., Camry, Civic, F-150"
                  value={vehicleModel}
                  onChangeText={setVehicleModel}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Year</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="calendar" size={20} color="#888" />
                <TextInput
                  placeholder="e.g., 2020"
                  value={vehicleYear}
                  onChangeText={setVehicleYear}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Plate Number</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="hash" size={20} color="#888" />
                <TextInput
                  placeholder="Enter license plate number"
                  value={licensePlate}
                  onChangeText={setLicensePlate}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="characters"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Vehicle Color</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="droplet" size={20} color="#888" />
                <TextInput
                  placeholder="e.g., Red, Blue, Silver"
                  value={color}
                  onChangeText={setColor}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </Animated.View>
          )}
          {currentStep === 3 && (
            <Animated.View entering={FadeInDown.duration(300)}>
              <Text className="text-xl font-bold text-gray-800 mb-4">Emergency Contact</Text>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Contact Name</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="user" size={20} color="#888" />
                <TextInput
                  placeholder="Enter emergency contact name"
                  value={emergencyName}
                  onChangeText={setEmergencyName}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Contact Phone</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="phone" size={20} color="#888" />
                <TextInput
                  placeholder="Enter emergency contact phone"
                  value={emergencyPhone}
                  onChangeText={setEmergencyPhone}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Relationship</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="users" size={20} color="#888" />
                <TextInput
                  placeholder="e.g., Spouse, Parent, Friend"
                  value={relationship}
                  onChangeText={setRelationship}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View className="p-4 bg-gray-100 rounded-xl mb-4">
                <Text className="text-gray-700 text-sm">
                  By completing your profile, you agree to our Terms of Service and Privacy Policy. 
                  Your information will only be used to provide roadside assistance services.
                </Text>
              </View>
            </Animated.View>
          )}
        </ScrollView>
        <View className="py-6">
          <TouchableOpacity
            className="bg-[#D92C2C] rounded-full py-4 items-center"
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-lg">
              {currentStep < totalSteps ? "Next" : "Complete Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}