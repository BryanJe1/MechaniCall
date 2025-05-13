import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MarkCompletedScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [request, setRequest] = useState({
    id: id,
    customer: "Sample Customer 1",
    service: "Flat Tire",
    status: "in_progress",
    address: "Pang Pang, Sorsogon City, Sorsogon",
    serviceDate: new Date().toLocaleDateString(),
    serviceTime: "45 minutes",
    baseCharge: 300.00,
    additionalCharges: 0,
    total: 300.00,
  });
  
  const [additionalServices, setAdditionalServices] = useState([
    { id: "as1", name: "Parts Replacement", price: 500.00, selected: false },
    { id: "as2", name: "Extended Service", price: 150.00, selected: false },
    { id: "as3", name: "Emergency Fee", price: 50.00, selected: false },
  ]);
  
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const toggleAdditionalService = (serviceId: string) => {
    const updatedServices = additionalServices.map(service => 
      service.id === serviceId 
        ? { ...service, selected: !service.selected } 
        : service
    );
    
    setAdditionalServices(updatedServices);
    
    const additionalTotal = updatedServices
      .filter(service => service.selected)
      .reduce((sum, service) => sum + service.price, 0);
    
    setRequest({
      ...request,
      additionalCharges: additionalTotal,
      total: request.baseCharge + additionalTotal,
    });
  };
  
  const submitCompletedService = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push({
        pathname: "/mechanic/CompletionSuccessScreen",
        params: { id: id, total: request.total.toFixed(2) }
      });
    }, 1500);
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
          <Text className="text-white text-3xl font-bold">Complete Service</Text>
          <Text className="text-white/80 text-base mt-2 text-center">
            Mark this service request as completed
          </Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView className="flex-1 p-6">
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-2">Service Summary</Text>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Customer:</Text>
              <Text className="font-medium text-gray-800">{request.customer}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Service:</Text>
              <Text className="font-medium text-gray-800">{request.service}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Location:</Text>
              <Text className="font-medium text-gray-800">{request.address}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Date:</Text>
              <Text className="font-medium text-gray-800">{request.serviceDate}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Service Time:</Text>
              <Text className="font-medium text-gray-800">{request.serviceTime}</Text>
            </View>
          </View>
          <Text className="text-lg font-bold text-gray-800 mb-3">Additional Services</Text>
          {additionalServices.map((service) => (
            <TouchableOpacity 
              key={service.id}
              className={`flex-row justify-between items-center p-4 mb-3 rounded-xl border ${
                service.selected ? 'border-[#D92C2C] bg-[#D92C2C]/5' : 'border-gray-200'
              }`}
              onPress={() => toggleAdditionalService(service.id)}
            >
              <View className="flex-row items-center">
                <View className={`w-5 h-5 rounded-full border mr-3 items-center justify-center ${
                  service.selected ? 'border-[#D92C2C] bg-[#D92C2C]' : 'border-gray-400'
                }`}>
                  {service.selected && <Feather name="check" size={12} color="white" />}
                </View>
                <Text className={`font-medium ${service.selected ? 'text-[#D92C2C]' : 'text-gray-800'}`}>
                  {service.name}
                </Text>
              </View>
              <Text className={`font-bold ${service.selected ? 'text-[#D92C2C]' : 'text-gray-800'}`}>
                ₱{service.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
          <Text className="text-lg font-bold text-gray-800 mt-2 mb-3">Service Notes</Text>
          <TextInput
            className="border border-gray-200 rounded-xl p-4 min-h-[100px] text-gray-800 mb-6"
            placeholder="Add notes about the service performed..."
            multiline={true}
            value={notes}
            onChangeText={setNotes}
          />
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Payment Summary</Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Base Service Charge:</Text>
              <Text className="font-medium text-gray-800">₱{request.baseCharge.toFixed(2)}</Text>
            </View>
            {request.additionalCharges > 0 && (
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Additional Services:</Text>
                <Text className="font-medium text-gray-800">₱{request.additionalCharges.toFixed(2)}</Text>
              </View>
            )}
            <View className="border-t border-gray-300 my-2" />
            <View className="flex-row justify-between">
              <Text className="font-bold text-gray-800">Total:</Text>
              <Text className="font-bold text-[#D92C2C]">₱{request.total.toFixed(2)}</Text>
            </View>
          </View>
          <View className="bg-blue-50 p-4 rounded-xl mb-6">
            <Text className="text-blue-800">
              By marking this service as complete, you confirm that all requested services have been performed to the customer's satisfaction.
            </Text>
          </View>
        </ScrollView>
        <View className="p-6 border-t border-gray-200">
          <TouchableOpacity
            className={`rounded-full py-4 items-center ${isSubmitting ? 'bg-gray-400' : 'bg-green-600'}`}
            onPress={submitCompletedService}
            disabled={isSubmitting}
          >
            <Text className="text-white font-bold text-lg">
              {isSubmitting ? 'Processing...' : 'Mark as Completed'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}