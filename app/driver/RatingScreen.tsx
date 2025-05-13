import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SetStateAction, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RatingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [service, setService] = useState({
    id: id,
    type: "Flat Tire",
    mechanic: {
      id: "m1",
      name: "Sample Mechanic 1",
      businessName: "Sample Mechanic 1's Auto Repair",
    },
    date: "April 26, 2025",
  });
  
  const handleRating = (value: SetStateAction<number>) => {
    setRating(value);
  };
  
  const submitRating = () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push({
        pathname: "/driver/RatingSuccessScreen",
        params: { rating }
      });
    }, 1500);
  };
  
  const skipRating = () => {
    router.push("/driver/DriverDashboard");
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
          <Text className="text-white text-3xl font-bold">Rate & Review</Text>
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <ScrollView className="flex-1 p-6">
          <View className="items-center mb-8">
            <View className="bg-[#D92C2C]/10 p-6 rounded-full mb-4">
              <Feather name="tool" size={32} color="#D92C2C" />
            </View>
            <Text className="text-xl font-bold text-gray-800">{service.mechanic.name}</Text>
            <Text className="text-gray-600">{service.type} • {service.date}</Text>
          </View>
          <View className="items-center mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">How was your experience?</Text>
            <View className="flex-row mb-6">
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity 
                  key={value}
                  className="mx-2"
                  onPress={() => handleRating(value)}
                >
                  <Feather 
                    name={value <= rating ? "star" : "star"} 
                    size={40} 
                    color={value <= rating ? "#F59E0B" : "#E5E7EB"} 
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-gray-600 text-center">
              {rating === 0 ? "Tap a star to rate" :
               rating === 1 ? "Poor" :
               rating === 2 ? "Fair" :
               rating === 3 ? "Good" :
               rating === 4 ? "Very Good" : "Excellent"}
            </Text>
          </View>
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">Additional Feedback (Optional)</Text>
            <TextInput
              className="border border-gray-200 rounded-xl p-4 min-h-[150px] text-gray-800"
              placeholder="Share your experience with this service..."
              multiline={true}
              value={feedback}
              onChangeText={setFeedback}
            />
          </View>
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">What went well?</Text>
            <View className="flex-row flex-wrap">
              <QuickFeedbackOption text="Fast Service" />
              <QuickFeedbackOption text="Professional" />
              <QuickFeedbackOption text="Knowledgeable" />
              <QuickFeedbackOption text="Fair Price" />
              <QuickFeedbackOption text="Friendly" />
              <QuickFeedbackOption text="Clean" />
            </View>
          </View>
        </ScrollView>
        <View className="p-6 border-t border-gray-200">
          <TouchableOpacity
            className={`rounded-full py-4 items-center mb-3 ${
              rating === 0 || isSubmitting ? 'bg-gray-400' : 'bg-[#D92C2C]'
            }`}
            onPress={submitRating}
            disabled={rating === 0 || isSubmitting}
          >
            <Text className="text-white font-bold text-lg">
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-2 items-center"
            onPress={skipRating}
          >
            <Text className="text-gray-600">Skip for now</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const QuickFeedbackOption = ({ text }: { text: string }) => {
  const [selected, setSelected] = useState(false);
  
  return (
    <TouchableOpacity 
      className={`mr-2 mb-2 px-3 py-1.5 rounded-full border ${
        selected ? 'bg-[#D92C2C]/10 border-[#D92C2C]' : 'border-gray-200'
      }`}
      onPress={() => setSelected(!selected)}
    >
      <Text className={`text-sm ${selected ? 'text-[#D92C2C]' : 'text-gray-700'}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};