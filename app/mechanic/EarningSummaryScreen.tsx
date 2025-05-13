import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function EarningsSummaryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<keyof typeof earningsData>("week");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [earningsData, setEarningsData] = useState({
    today: {
      total: 1200.00,
      jobs: 2,
      breakdown: [
        { id: "e1", service: "Flat Tire", customer: "Sample Customer 1", amount: 500.00, time: "10:30 AM" },
        { id: "e2", service: "Jump Start", customer: "Sample Customer 2", amount: 700.00, time: "2:15 PM" },
      ]
    },
    week: {
      total: 200.00,
      jobs: 2,
      breakdown: [
        { id: "e3", service: "Towing", customer: "Sample Customer 3", amount: 100.00, time: "Today" },
        { id: "e4", service: "Flat Tire", customer: "Sample Customer 4", amount: 100.00, time: "Yesterday" },
      ]
    },
    month: {
      total: 1400.00,
      jobs: 3,
      breakdown: [
        { id: "e5", service: "Towing", customer: "Sample Customer 5", amount: 1000.00, time: "Yesterday" },
        { id: "e6", service: "Flat Tire", customer: "Sample Customer 6", amount: 300.00, time: "Today" },
        { id: "e7", service: "Jump Start", customer: "Sample Customer 7", amount: 100.00, time: "Today" },
      ]
    }
  });
  
  const getCurrentData = () => {
    return earningsData[activeTab];
  };
  
  const formatCurrency = (amount: number) => {
    return `₱${amount.toFixed(2)}`;
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
          <Text className="text-white text-3xl font-bold">Earnings</Text>
          <Text className="text-white/80 text-base mt-2 text-center">
            Track your earnings
          </Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <View className="flex-row border-b border-gray-200">
          <TouchableOpacity 
            className={`flex-1 py-4 items-center ${activeTab === 'today' ? 'border-b-2 border-[#D92C2C]' : ''}`}
            onPress={() => setActiveTab('today')}
          >
            <Text className={`font-medium ${activeTab === 'today' ? 'text-[#D92C2C]' : 'text-gray-600'}`}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-4 items-center ${activeTab === 'week' ? 'border-b-2 border-[#D92C2C]' : ''}`}
            onPress={() => setActiveTab('week')}
          >
            <Text className={`font-medium ${activeTab === 'week' ? 'text-[#D92C2C]' : 'text-gray-600'}`}>
              This Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-4 items-center ${activeTab === 'month' ? 'border-b-2 border-[#D92C2C]' : ''}`}
            onPress={() => setActiveTab('month')}
          >
            <Text className={`font-medium ${activeTab === 'month' ? 'text-[#D92C2C]' : 'text-gray-600'}`}>
              This Month
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="p-6 border-b border-gray-200">
            <View className="items-center">
              <Text className="text-gray-600 mb-1">Total Earnings</Text>
              <Text className="text-3xl font-bold text-[#D92C2C]">
                {formatCurrency(getCurrentData().total)}
              </Text>
              <Text className="text-gray-600 mt-1">
                {getCurrentData().jobs} {getCurrentData().jobs === 1 ? 'job' : 'jobs'} completed
              </Text>
            </View>
            <View className="h-40 mt-6 bg-gray-50 rounded-xl items-center justify-center">
              <Text className="text-gray-400">Earnings chart would appear here</Text>
            </View>
          </View>
          <View className="p-6">
            <Text className="text-lg font-bold mb-4">Earnings Breakdown</Text>
            {getCurrentData().breakdown.map((earning) => (
              <View 
                key={earning.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <View>
                    <Text className="font-bold text-gray-800">{earning.service}</Text>
                    <Text className="text-gray-600">{earning.customer}</Text>
                  </View>
                  <Text className="text-lg font-bold text-[#D92C2C]">
                    {formatCurrency(earning.amount)}
                  </Text>
                </View>
                <Text className="text-gray-500">{earning.time}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View className="p-6 border-t border-gray-200">
          <TouchableOpacity
            className="bg-gray-100 rounded-full py-4 items-center"
            activeOpacity={0.8}
          >
            <Text className="text-gray-800 font-medium">Export Earnings Report</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}