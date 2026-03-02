import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";

import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShopScreen from "../screens/ShopScreen";
import WishlistScreen from "../screens/WishlistScreen";
import { AppContext } from "../store/AppContext";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { cart, wishlist } = useContext(AppContext);
  const cartItemCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Shop") iconName = "pricetag";
          else if (route.name === "Cart") iconName = "cart";
          else if (route.name === "Wishlist") iconName = "heart";
          else if (route.name === "Profile") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarBadge: wishlist.length > 0 ? wishlist.length : undefined,
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
