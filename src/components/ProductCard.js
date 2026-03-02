import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "../styles/unistyles";

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.wishlistBtn} onPress={onToggleWishlist}>
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={16}
            color={isWishlisted ? "#ef4444" : theme.colors.text}
          />
          <Text
            style={[styles.wishlistText, isWishlisted && { color: "#ef4444" }]}
          >
            Wishlist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn} onPress={onAddToCart}>
          <Text style={styles.cartText}>+ Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  price: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "600",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
  },
  wishlistBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    marginRight: 8,
  },
  wishlistText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  cartBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  cartText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
}));
