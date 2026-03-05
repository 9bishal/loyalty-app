// Forgot Password Screen – UI only, validation in authService
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { validatePasswordRecovery } from "../services/authService";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function ForgotPasswordScreen({ navigation }) {
  const { theme } = useUnistyles();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const result = validatePasswordRecovery(email);
      setLoading(false);
      if (result.success) {
        setSent(true);
      } else {
        Alert.alert("Error", result.error);
      }
    }, 1000);
  };

  if (sent) {
    return (
      <View style={styles.container}>
        <View style={styles.successContent}>
          <View style={styles.successIcon}>
            <Ionicons name="mail-open" size={48} color={theme.colors.primary} />
          </View>
          <Text style={styles.successTitle}>Check Your Email</Text>
          <Text style={styles.successSubtitle}>
            We've sent a password reset link to{"\n"}
            <Text style={{ fontWeight: "700", color: theme.colors.text }}>
              {email}
            </Text>
          </Text>
          <Button
            title="Back to Login"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 32 }}
          />
          <TouchableOpacity
            style={styles.resendBtn}
            onPress={() => {
              setSent(false);
              setEmail("");
            }}
          >
            <Text style={styles.resendText}>Didn't receive it? Try again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        {/* Header */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <Ionicons
            name="lock-open-outline"
            size={40}
            color={theme.colors.primary}
          />
        </View>

        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          No worries! Enter your email and we'll send you a reset link.
        </Text>

        <Input
          label="Email Address"
          placeholder="Enter your registered email"
          iconName="mail-outline"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button
          title="Send Reset Link"
          onPress={handleSubmit}
          loading={loading}
          style={{ marginTop: 8 }}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Remember your password? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    justifyContent: "flex-start",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.muted,
    lineHeight: 22,
    marginBottom: 32,
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
  // Success state
  successContent: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 15,
    color: theme.colors.muted,
    textAlign: "center",
    lineHeight: 22,
  },
  resendBtn: {
    marginTop: 20,
    padding: 12,
  },
  resendText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "600",
  },
}));
