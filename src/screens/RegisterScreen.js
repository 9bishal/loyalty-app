import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
import { useStore } from "../store/useStore";

export default function RegisterScreen({ navigation }) {
  const login = useStore((state) => state.login);
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
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerClassName="md:max-w-md md:mx-auto w-full"
        contentContainerStyle={{
          padding: 24,
          paddingTop: 60,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-8">
          <TouchableOpacity
            className="w-10 h-10 rounded-xl bg-card items-center justify-center mb-6"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View className="w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-4">
            <Ionicons name="gift" size={36} color="#2563eb" />
          </View>
          <Text className="text-3xl font-bold text-text mb-2">
            Create Account
          </Text>
          <Text className="text-base text-muted">
            Join the XYZ Rewards program
          </Text>
        </View>

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

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="mx-4 text-sm text-muted">or sign up with</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <View className="flex-row justify-center gap-4">
          {[
            { icon: "logo-google", color: "#DB4437", label: "Google" },
            { icon: "logo-apple", color: "#000000", label: "Apple" },
            { icon: "logo-facebook", color: "#1877F2", label: "Facebook" },
          ].map((social) => (
            <TouchableOpacity
              key={social.label}
              className="w-14 h-14 rounded-xl bg-card items-center justify-center border border-gray-200"
            >
              <Ionicons name={social.icon} size={22} color={social.color} />
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-sm text-muted">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-sm font-bold text-primary">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
