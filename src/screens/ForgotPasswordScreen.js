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

export default function ForgotPasswordScreen({ navigation }) {
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
      <View className="flex-1 bg-background pt-16">
        <View className="flex-1 justify-center items-center px-6 md:max-w-md md:mx-auto w-full">
          <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center mb-6">
            <Ionicons name="mail-open" size={48} color="#2563eb" />
          </View>
          <Text className="text-2xl font-bold text-text mb-3">
            Check Your Email
          </Text>
          <Text className="text-base text-muted text-center leading-6">
            We've sent a password reset link to{"\n"}
            <Text className="font-bold text-text">{email}</Text>
          </Text>
          <Button
            title="Back to Login"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 32, width: "100%" }}
          />
          <TouchableOpacity
            className="mt-5 p-3"
            onPress={() => {
              setSent(false);
              setEmail("");
            }}
          >
            <Text className="text-sm text-primary font-semibold">
              Didn't receive it? Try again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 px-6 pt-[60px] justify-start md:max-w-md md:mx-auto w-full">
        <TouchableOpacity
          className="w-10 h-10 rounded-xl bg-card items-center justify-center mb-8"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View className="w-[72px] h-[72px] rounded-bl-3xl rounded-tr-3xl bg-primary/10 items-center justify-center mb-6">
          <Ionicons name="lock-open-outline" size={40} color="#2563eb" />
        </View>

        <Text className="text-3xl font-bold text-text mb-3">
          Forgot Password?
        </Text>
        <Text className="text-base text-muted leading-6 mb-8">
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

        <View className="flex-row justify-center mt-8">
          <Text className="text-sm text-muted">Remember your password? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-sm font-bold text-primary">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
