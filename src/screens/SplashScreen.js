import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#2563eb",
        }}
      >
        XYZ Rewards
      </Text>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={{ marginTop: 10, color: "#6b7280" }}>
        Loading your data...
      </Text>
    </View>
  );
}
