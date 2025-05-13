import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  const router = useRouter();
  
  // Initialize with only mechanic notifications
  const [notifications, setNotifications] = useState([
    {
      id: "n4",
      type: "service_request",
      title: "New Service Request",
      message: "Sample Customer 1 is requesting Flat Tire service 1.2 km away.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "n5",
      type: "earnings",
      title: "Weekly Earnings Update",
      message: "You've earned ₱200.00 this week. Keep up the good work!",
      time: "Yesterday",
      read: true,
    },
    {
      id: "n6",
      type: "system",
      title: "Profile Verification",
      message: "Your mechanic profile has been verified. You can now receive service requests.",
      time: "3 days ago",
      read: true,
    },
    {
      id: "n7",
      type: "service_update",
      title: "Service Completed",
      message: "You've successfully completed a Flat Tire service for John Doe.",
      time: "4 days ago",
      read: true,
    },
    {
      id: "n8",
      type: "promotion",
      title: "Premium Subscription",
      message: "Upgrade to Premium Mechanic for more visibility and higher earnings.",
      time: "1 week ago",
      read: true,
    },
  ]);
  
  const unreadCount = notifications.filter(
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
      case "service_request":
        return "clipboard";
      case "promotion":
        return "gift";
      case "system":
        return "bell";
      case "earnings":
        return "dollar-sign";
      default:
        return "info";
    }
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "service_update":
        return "bg-blue-50";
      case "service_request":
        return "bg-[#D92C2C]/5";
      case "promotion":
        return "bg-purple-50";
      case "system":
        return "bg-gray-50";
      case "earnings":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };
  
  const getIconColor = (type: string) => {
    switch (type) {
      case "service_update":
        return "#3B82F6";
      case "service_request":
        return "#D92C2C";
      case "promotion":
        return "#8B5CF6";
      case "system":
        return "#6B7280";
      case "earnings":
        return "#10B981";
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
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-800 font-medium">Mechanic Notifications</Text>
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
        </View>
        <ScrollView className="flex-1">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Animated.View 
                key={notification.id}
                entering={FadeInDown.delay(400).springify()}
                className={`p-4 border-b border-gray-100 ${notification.read ? '' : 'bg-gray-50'}`}
              >
                <TouchableOpacity 
                  className="flex-row"
                  onPress={() => markAsRead(notification.id)}
                >
                  <View className={`${getNotificationColor(notification.type)} p-4 mr-3 justify-center items-center`}>
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
                {notification.type === "service_request" && (
                  <View className="flex-row mt-3 ml-12">
                    <TouchableOpacity 
                      className="bg-[#D92C2C] rounded-full py-1.5 px-4 mr-2"
                      onPress={() => {
                        markAsRead(notification.id);
                        router.push({ pathname: "/mechanic/ServiceRequestDetailScreen", params: { id: "new" } });
                      }}
                    >
                      <Text className="text-white font-medium">Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className="bg-gray-100 rounded-full py-1.5 px-4"
                      onPress={() => deleteNotification(notification.id)}
                    >
                      <Text className="text-gray-700 font-medium">Decline</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {notification.type === "earnings" && (
                  <View className="flex-row mt-3 ml-12">
                    <TouchableOpacity 
                      className="bg-[#D92C2C] rounded-full py-1.5 px-4 mr-2"
                      onPress={() => {
                        markAsRead(notification.id);
                        router.push("/mechanic/EarningSummaryScreen");
                      }}
                    >
                      <Text className="text-white font-medium">View Earnings</Text>
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
              <Text className="text-gray-400 mt-4 text-lg">No notifications</Text>
              <Text className="text-gray-400 text-center mt-2 px-10">
                You don't have any notifications at the moment. They will appear here when you receive them.
              </Text>
            </View>
          )}
          <View className="h-6" />
        </ScrollView>
        <View className="p-4 border-t border-gray-200">
          <TouchableOpacity 
            className="flex-row items-center justify-center py-3"
          >
            <Feather name="settings" size={16} color="#D92C2C" />
            <Text className="text-[#D92C2C] font-medium ml-2">Notification Settings</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}