import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { addToCart } from "../services/cartService";
import { removeFromWishlist } from "../services/wishlistService";
import { AppContext } from "../store/AppContext";
import { createStyleSheet, useStyles } from "../styles/unistyles";

export default function WishlistScreen() {
  const { wishlist, setWishlist, cart, setCart } = useContext(AppContext);
  const { styles } = useStyles(stylesheet);

  const movetoCart = (item) => {
    setCart(addToCart(cart, item));
    setWishlist(removeFromWishlist(wishlist, item.id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => movetoCart(item)}
        >
          <Text style={styles.cartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => setWishlist(removeFromWishlist(wishlist, item.id))}
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="My Wishlist" />
      <FlatList
        data={wishlist}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your wishlist is empty.</Text>
          </View>
        }
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: 20,
    flexGrow: 1,
  },
  wishlistItem: {
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
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  cartBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  removeBtn: {
    padding: 8,
  },
  removeText: {
    color: "#ef4444",
    fontSize: 12,
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
