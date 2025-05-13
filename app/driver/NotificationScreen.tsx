import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  const router = useRouter();

  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      type: "service_update",
      title: "Service Request Accepted",
      message: "Sample Mechanic 1's Auto Repair has accepted your request for Flat Tire service.",
      time: "10 minutes ago",
      read: false,
      userType: "driver",
    },
    {
      id: "n2",
      type: "promotion",
      title: "Special Offer",
      message: "Get 15% off on your next roadside assistance service. Valid until May 20.",
      time: "2 hours ago",
      read: false,
      userType: "driver",
    },
    {
      id: "n3",
      type: "system",
      title: "Payment Successful",
      message: "Your payment of ₱100.00 for Flat Tire service has been processed successfully.",
      time: "Yesterday",
      read: true,
      userType: "driver",
    },
  ]);

  const filteredNotifications = notifications.filter(
    notification => notification.userType === "driver"
  );

  const unreadCount = filteredNotifications.filter(
    notification => !notification.read
  ).length;

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "service_update":
        return "tool";
      case "promotion":
        return "gift";
      case "system":
        return "bell";
      default:
        return "info";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "service_update":
        return "bg-blue-50";
      case "promotion":
        return "bg-purple-50";
      case "system":
        return "bg-gray-50";
      default:
        return "bg-gray-50";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "service_update":
        return "#3B82F6";
      case "promotion":
        return "#8B5CF6";
      case "system":
        return "#6B7280";
      default:
        return "#6B7280";
    }
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
          <Text className="text-white text-3xl font-bold">Notifications</Text>
          {unreadCount > 0 && (
            <Text className="text-white/80 text-base mt-2">
              You have {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
            </Text>
          )}
        </Animated.View>
      </View>
      <Animated.View 
        className="flex-1 bg-white rounded-t-[30px]"
        entering={FadeInDown.delay(300).springify()}
      >
        <View className="p-4 border-b border-gray-200">
          {unreadCount > 0 && (
            <TouchableOpacity 
              className="flex-row items-center"
              onPress={markAllAsRead}
            >
              <Feather name="check-circle" size={16} color="#D92C2C" />
              <Text className="text-[#D92C2C] font-medium ml-2">Mark all as read</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView className="flex-1">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Animated.View 
                key={notification.id}
                entering={FadeInDown.delay(400).springify()}
                className={`p-4 border-b border-gray-100 ${notification.read ? '' : 'bg-gray-50'}`}
              >
                <TouchableOpacity 
                  className="flex-row"
                  onPress={() => markAsRead(notification.id)}
                >
                  <View className={`${getNotificationColor(notification.type)} p-3 mr-3 justify-center items-center`}>
                    <Feather 
                      name={getNotificationIcon(notification.type)} 
                      size={20} 
                      color={getIconColor(notification.type)} 
                    />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className={`font-bold text-gray-800 ${notification.read ? '' : 'text-black'}`}>
                        {notification.title}
                      </Text>
                      <TouchableOpacity onPress={() => deleteNotification(notification.id)}>
                        <Feather name="x" size={16} color="#9CA3AF" />
                      </TouchableOpacity>
                    </View>
                    <Text className="text-gray-600 mb-2">{notification.message}</Text>
                    <View className="flex-row items-center">
                      <Feather name="clock" size={12} color="#9CA3AF" />
                      <Text className="text-gray-400 text-xs ml-1">{notification.time}</Text>
                      {!notification.read && (
                        <View className="ml-2 w-2 h-2 rounded-full bg-[#D92C2C]" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                {notification.type === "service_update" && (
                  <View className="flex-row mt-3 ml-12">
                    <TouchableOpacity 
                      className="bg-[#D92C2C] rounded-full py-1.5 px-4 mr-2"
                      onPress={() => {
                        markAsRead(notification.id);
                        router.push("/driver/GPSTrackingScreen");
                      }}
                    >
                      <Text className="text-white font-medium">Track Service</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {notification.type === "promotion" && (
                  <View className="flex-row mt-3 ml-12">
                    <TouchableOpacity 
                      className="bg-[#D92C2C] rounded-full py-1.5 px-4 mr-2"
                      onPress={() => {
                        markAsRead(notification.id);
                      }}
                    >
                      <Text className="text-white font-medium">View Offer</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Animated.View>
            ))
          ) : (
            <View className="items-center justify-center py-20">
              <Feather name="bell-off" size={60} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg mt-4">No notifications</Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
