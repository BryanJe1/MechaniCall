import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MechanicInfoScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [experience, setExperience] = useState("");
  const [certification, setCertification] = useState("");
  const [businessName, setBusinessName] = useState("");
  
  const [serviceArea, setServiceArea] = useState("");
  const [services, setServices] = useState({
    flatTire: false,
    jumpStart: false,
    towing: false,
    fuelDelivery: false,
    lockout: false,
    battery: false,
  });
  
  const handleNext = () => {
    if (currentStep === 1) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        Alert.alert("Error", "Please fill in all personal information fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!experience.trim() || !certification.trim()) {
        Alert.alert("Error", "Please fill in all required professional information fields");
        return;
      }
    } else if (currentStep === 3) {
      if (!serviceArea.trim()) {
        Alert.alert("Error", "Please enter your service area");
        return;
      }
      const hasSelectedService = Object.values(services).some(value => value === true);
      if (!hasSelectedService) {
        Alert.alert("Error", "Please select at least one service you provide");
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      Alert.alert(
        "Success", 
        "Your mechanic profile has been created successfully!",
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
  
  const toggleService = (service: keyof typeof services) => {
    setServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
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
          <Text className="text-white text-3xl font-bold">Mechanic Profile</Text>
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
              <Text className="text-xl font-bold text-gray-800 mb-4">Professional Information</Text>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Years of Experience</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="clock" size={20} color="#888" />
                <TextInput
                  placeholder="e.g., 5 years"
                  value={experience}
                  onChangeText={setExperience}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Certifications</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="award" size={20} color="#888" />
                <TextInput
                  placeholder="e.g., ASE Certified, Master Mechanic"
                  value={certification}
                  onChangeText={setCertification}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Business Name (Optional)</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <Feather name="briefcase" size={20} color="#888" />
                <TextInput
                  placeholder="Enter your business name if applicable"
                  value={businessName}
                  onChangeText={setBusinessName}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View className="p-4 bg-gray-100 rounded-xl mb-4">
                <Text className="text-gray-700 text-sm">
                  Your professional information helps build trust with customers. 
                  We may verify your certifications to ensure quality service.
                </Text>
              </View>
            </Animated.View>
          )}
          {currentStep === 3 && (
            <Animated.View entering={FadeInDown.duration(300)}>
              <Text className="text-xl font-bold text-gray-800 mb-4">Services & Availability</Text>
              
              <Text className="text-gray-700 font-medium mb-2 ml-1">Service Area</Text>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3 mb-6">
                <Feather name="map-pin" size={20} color="#888" />
                <TextInput
                  placeholder="e.g., Piot Sorsogon City"
                  value={serviceArea}
                  onChangeText={setServiceArea}
                  className="flex-1 ml-3 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text className="text-gray-700 font-medium mb-4 ml-1">Services You Provide</Text>
              <View className="mb-6 bg-gray-50 rounded-xl p-4">
                <ServiceToggle 
                  label="Flat Tire Repair" 
                  icon="disc"
                  isEnabled={services.flatTire}
                  onToggle={() => toggleService('flatTire')}
                />
                <ServiceToggle 
                  label="Jump Start" 
                  icon="zap"
                  isEnabled={services.jumpStart}
                  onToggle={() => toggleService('jumpStart')}
                />
                <ServiceToggle 
                  label="Towing" 
                  icon="truck"
                  isEnabled={services.towing}
                  onToggle={() => toggleService('towing')}
                />
                <ServiceToggle 
                  label="Fuel Delivery" 
                  icon="droplet"
                  isEnabled={services.fuelDelivery}
                  onToggle={() => toggleService('fuelDelivery')}
                />
                <ServiceToggle 
                  label="Lockout Assistance" 
                  icon="key"
                  isEnabled={services.lockout}
                  onToggle={() => toggleService('lockout')}
                />
                <ServiceToggle 
                  label="Battery Replacement" 
                  icon="battery"
                  isEnabled={services.battery}
                  onToggle={() => toggleService('battery')}
                  noBorder
                />
              </View>
              <View className="p-4 bg-gray-100 rounded-xl mb-4">
                <Text className="text-gray-700 text-sm">
                  By completing your profile, you agree to our Terms of Service and Privacy Policy. 
                  You'll receive notifications for service requests in your area.
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

interface ServiceToggleProps {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  isEnabled: boolean;
  onToggle: () => void;
  noBorder?: boolean;
}

const ServiceToggle = ({ label, icon, isEnabled, onToggle, noBorder = false }: ServiceToggleProps) => {
  return (
    <View className={`flex-row items-center justify-between py-3 ${noBorder ? '' : 'border-b border-gray-200'}`}>
      <View className="flex-row items-center">
        <View className="bg-[#D92C2C]/10 w-8 h-8 rounded-full items-center justify-center">
          <Feather name={icon} size={16} color="#D92C2C" />
        </View>
        <Text className="text-gray-800 ml-3">{label}</Text>
      </View>
      <Switch
        trackColor={{ false: "#E5E7EB", true: "#F87171" }}
        thumbColor={isEnabled ? "#D92C2C" : "#fff"}
        ios_backgroundColor="#E5E7EB"
        onValueChange={onToggle}
        value={isEnabled}
      />
    </View>
  );
};