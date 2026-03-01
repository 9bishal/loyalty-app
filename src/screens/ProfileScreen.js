import { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { AppContext } from "../store/AppContext";
import { StyleSheet, useStyles } from "../styles/unistyles";

export default function ProfileScreen() {
  const { rewardPoints, purchaseHistory, user, logout } =
    useContext(AppContext);
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Header title="My Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.name}>{user?.name || "Guest"}</Text>
          <Text style={styles.username}>@{user?.username || "guest"}</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{rewardPoints} points</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Purchase History</Text>
        {purchaseHistory.length > 0 ? (
          purchaseHistory.map((order, index) => (
            <View key={index} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderLabel}>Order #{index + 1}</Text>
                <Text style={styles.orderTotal}>₹{order.total}</Text>
              </View>
              <Text style={styles.orderItems}>
                {order.items.map((item) => item.name).join(", ")}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No orders yet.</Text>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  username: {
    fontSize: 16,
    color: theme.colors.muted,
    marginBottom: 16,
  },
  pointsBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  pointsText: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderLabel: {
    fontWeight: "600",
    color: theme.colors.text,
  },
  orderTotal: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  orderItems: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  emptyText: {
    textAlign: "center",
    color: theme.colors.muted,
    marginVertical: 20,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 40,
  },
  logoutText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16,
  },
}));
