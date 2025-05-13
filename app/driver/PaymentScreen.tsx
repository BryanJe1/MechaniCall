import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen() {
  const router = useRouter();
  const { id, amount } = useLocalSearchParams();
  
  const [paymentAmount, setPaymentAmount] = useState(
    typeof amount === "string" ? parseFloat(amount) : 100.00
  );
  const [tip, setTip] = useState(0);
  const [selectedTipIndex, setSelectedTipIndex] = useState(-1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const tipOptions = [0, 5, 10, 15, 20];
  
  const paymentMethods: { id: number; type: string; last4?: string; email?: string; icon: "credit-card" | "dollar-sign" }[] = [
      { id: 1, type: "Credit Card", last4: "4567", icon: "credit-card" },
      { id: 2, type: "Gcash", email: "+639 123 456 7890", icon: "dollar-sign" },
  ];
  
  const calculateTotal = () => {
    return paymentAmount + tip;
  };
  
  const handleTipSelection = (index: number) => {
      setSelectedTipIndex(index);
      setTip(tipOptions[index]);
  };
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      router.push({
        pathname: "/driver/PaymentSuccessScreen",
        params: { amount: calculateTotal().toFixed(2) }
      });
    }, 2000);
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
          <Text className="text-white text-3xl font-bold">Payment</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView className="flex-1 p-6">
          <View className="items-center mb-8">
            <Text className="text-gray-600 mb-2">Total Amount</Text>
            <Text className="text-4xl font-bold text-gray-800">₱{calculateTotal().toFixed(2)}</Text>
            <Text className="text-gray-500 mt-2">Service Fee: ₱{paymentAmount.toFixed(2)}</Text>
            {tip > 0 && (
              <Text className="text-gray-500">Tip: ₱{tip.toFixed(2)}</Text>
            )}
          </View>
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">Add a Tip</Text>
            <View className="flex-row justify-between">
              {tipOptions.map((tipAmount, index) => (
                <TouchableOpacity 
                  key={index}
                  className={`py-2 px-4 rounded-full ${
                    selectedTipIndex === index 
                      ? 'bg-[#D92C2C] border-[#D92C2C]' 
                      : 'bg-white border-gray-200'
                  } border`}
                  onPress={() => handleTipSelection(index)}
                >
                  <Text className={`font-medium ${
                    selectedTipIndex === index ? 'text-white' : 'text-gray-800'
                  }`}>
                    {tipAmount === 0 ? 'No Tip' : `₱${tipAmount}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row items-center mt-4">
              <Text className="text-gray-600 mr-2">Custom Tip:</Text>
              <TextInput
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-gray-800"
                placeholder="Enter amount"
                keyboardType="numeric"
                value={selectedTipIndex === -1 ? tip.toString() : ''}
                onChangeText={(text) => {
                  const newTip = parseFloat(text) || 0;
                  setTip(newTip);
                  setSelectedTipIndex(-1);
                }}
              />
            </View>
          </View>
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">Payment Method</Text>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity 
                key={method.id}
                className={`flex-row items-center p-4 mb-3 rounded-xl border ${
                  selectedPaymentMethod === index 
                    ? 'border-[#D92C2C] bg-[#D92C2C]/5' 
                    : 'border-gray-200'
                }`}
                onPress={() => setSelectedPaymentMethod(index)}
              >
                <View className={`w-5 h-5 rounded-full border mr-3 items-center justify-center ${
                  selectedPaymentMethod === index 
                    ? 'border-[#D92C2C] bg-[#D92C2C]' 
                    : 'border-gray-400'
                }`}>
                  {selectedPaymentMethod === index && (
                    <View className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </View>
                <View className="bg-gray-100 p-2 rounded-full mr-3">
                  <Feather name={method.icon} size={20} color="#6B7280" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">{method.type}</Text>
                  {method.last4 && (
                    <Text className="text-gray-600 text-sm">**** **** **** {method.last4}</Text>
                  )}
                  {method.email && (
                    <Text className="text-gray-600 text-sm">{method.email}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              className="flex-row items-center mt-2"
            >
              <Feather name="plus" size={16} color="#D92C2C" />
              <Text className="text-[#D92C2C] font-medium ml-2">Add Payment Method</Text>
            </TouchableOpacity>
          </View>
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">Notes (Optional)</Text>
            <TextInput
              className="border border-gray-200 rounded-xl p-4 min-h-[100px] text-gray-800"
              placeholder="Add any notes for the mechanic..."
              multiline={true}
            />
          </View>
        </ScrollView>
        <View className="p-6 border-t border-gray-200">
          <TouchableOpacity
            className={`rounded-full py-4 items-center ${isProcessing ? 'bg-gray-400' : 'bg-[#D92C2C]'}`}
            onPress={handlePayment}
            disabled={isProcessing}
          >
            <Text className="text-white font-bold text-lg">
              {isProcessing ? 'Processing...' : `Pay ₱${calculateTotal().toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}