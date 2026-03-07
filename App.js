import "./ignoreWarnings";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabs from "./src/navigation/BottomTabs";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { useStore } from "./src/store/useStore";

const Stack = createNativeStackNavigator();

function AppContent() {
  const { state } = useStore();

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!state.isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Main" component={BottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const initializeStore = useStore((s) => s.initializeStore);

  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
