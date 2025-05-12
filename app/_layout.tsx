import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Welcome Screens */}
        <Stack.Screen name="onboarding/WelcomeScreen1" options={{ headerShown: false }}/>
        <Stack.Screen name="onboarding/WelcomeScreen2" options={{ headerShown: false }}/>
        <Stack.Screen name="onboarding/WelcomeScreen3" options={{ headerShown: false }}/>

        {/* Auth Screens */}
        <Stack.Screen name="auth/LoginScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="auth/SignUpScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="auth/ForgotPasswordScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="auth/UserTypeScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="auth/DriverInfoScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="auth/MechanicInfoScreen" options={{ headerShown: false }}/>

        {/* Driver Screens */}
        <Stack.Screen name="driver/DriverDashboard" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/GPSTrackingScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/MechanicProfilePreviewScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/NearbyMechanicScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/PaymentScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/PaymentSuccessScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/ProfileScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/RatingScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/RatingSuccessScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/ServiceDetailScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/ServiceHistoryScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/ServiceRequestScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="driver/NotificationScreen" options={{ headerShown: false }}/>

        {/* Mechanic Screens */}
        <Stack.Screen name="mechanic/MechanicDashboard" options={{ headerShown: false }}/>
        <Stack.Screen name="mechanic/ServiceRequestDetailScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="mechanic/RouteNavigationScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="mechanic/MarkCompletedScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="mechanic/EarningSummaryScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="mechanic/ProfileScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="mechanic/AvailabilityToggleScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="mechanic/CompletionSuccessScreen" options={{ headerShown: false }}/>
        <Stack.Screen name="mechanic/NotificationScreen" options={{ headerShown: false }}/>

      </Stack>
    </SafeAreaProvider>
  );
}