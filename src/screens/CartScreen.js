import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import {
  calculateTotal,
  checkoutCart,
  removeFromCart,
} from "../services/cartService";
import { calculateRewardPoints } from "../services/rewardService";
import { AppContext } from "../store/AppContext";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function CartScreen() {
  const {
    cart,
    setCart,
    rewardPoints,
    setRewardPoints,
    purchaseHistory,
    setHistory,
  } = useContext(AppContext);

  const { theme } = useUnistyles();
  const total = calculateTotal(cart);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const result = checkoutCart(
      cart,
      rewardPoints,
      purchaseHistory,
      calculateRewardPoints,
    );

    setRewardPoints(result.updatedPoints);
    setHistory(result.updatedHistory);
    setCart(result.clearedCart);

    Alert.alert(
      "Success!",
      `Order placed! You earned ${result.earnedPoints} reward points.`,
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          ₹{item.price} {item.quantity > 1 ? `x ${item.quantity}` : ""}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => setCart(removeFromCart(cart, item.id))}
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="My Cart" />
      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        }
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: 20,
    flexGrow: 1,
  },
  cartItem: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  itemPrice: {
    fontSize: 14,
    color: theme.colors.muted,
    marginTop: 2,
  },
  removeBtn: {
    padding: 8,
  },
  removeText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    backgroundColor: theme.colors.card,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    color: theme.colors.muted,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  checkoutBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    color: theme.colors.muted,
    fontSize: 16,
  },
}));
