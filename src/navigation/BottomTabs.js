import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReferralScreen from "../screens/ReferralScreen";
import RewardDetailsScreen from "../screens/RewardDetailsScreen";
import RewardsScreen from "../screens/RewardsScreen";
import WalletScreen from "../screens/WalletScreen";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

// The 5 bottom tabs
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Rewards") iconName = "gift";
          else if (route.name === "Wallet") iconName = "wallet";
          else if (route.name === "Referral") iconName = "people";
          else if (route.name === "Profile") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Referral" component={ReferralScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root stack wraps tabs + shared screens (Notifications, RewardDetails)
// This makes Notifications reachable from ANY tab
export default function BottomTabs() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Tabs" component={TabNavigator} />
      <RootStack.Screen name="Notifications" component={NotificationsScreen} />
      <RootStack.Screen name="RewardDetails" component={RewardDetailsScreen} />
    </RootStack.Navigator>
  );
}
