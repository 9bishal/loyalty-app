// Registration Screen – UI only, all validation in authService
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { validateRegistration } from "../services/authService";
import { AppContext } from "../store/AppContext";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function RegisterScreen({ navigation }) {
  const { login } = useContext(AppContext);
  const { theme } = useUnistyles();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    setLoading(true);
    // Simulate async registration
    setTimeout(() => {
      const result = validateRegistration(form);
      setLoading(false);
      if (result.success) {
        login(result.user);
      } else {
        Alert.alert("Registration Failed", result.error);
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Ionicons name="gift" size={36} color={theme.colors.primary} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the Loyalty Rewards program</Text>
        </View>

        {/* Form */}
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          iconName="person-outline"
          value={form.name}
          onChangeText={(v) => updateField("name", v)}
          autoCapitalize="words"
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          iconName="mail-outline"
          value={form.email}
          onChangeText={(v) => updateField("email", v)}
          keyboardType="email-address"
        />
        <Input
          label="Phone Number"
          placeholder="Enter 10-digit phone number"
          iconName="call-outline"
          value={form.phone}
          onChangeText={(v) => updateField("phone", v)}
          keyboardType="phone-pad"
        />
        <Input
          label="Password"
          placeholder="Create a password"
          iconName="lock-closed-outline"
          value={form.password}
          onChangeText={(v) => updateField("password", v)}
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          placeholder="Re-enter your password"
          iconName="lock-closed-outline"
          value={form.confirmPassword}
          onChangeText={(v) => updateField("confirmPassword", v)}
          secureTextEntry
        />

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          style={{ marginTop: 8 }}
        />

        {/* Social Login */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign up with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          {[
            { icon: "logo-google", color: "#DB4437", label: "Google" },
            { icon: "logo-apple", color: "#000000", label: "Apple" },
            { icon: "logo-facebook", color: "#1877F2", label: "Facebook" },
          ].map((social) => (
            <TouchableOpacity key={social.label} style={styles.socialBtn}>
              <Ionicons name={social.icon} size={22} color={social.color} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Login Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 32,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: theme.colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.muted,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: theme.colors.muted,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.muted,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.primary,
  },
}));
