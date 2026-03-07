// Authentication business logic
// All auth-related validation and processing lives here, not in UI components

/**
 * Validate login credentials
 * @param {string} identifier - Email, phone, or username
 * @param {string} password - User's password
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export const validateLogin = (identifier, password) => {
  // Input validation
  if (!identifier || !identifier.trim()) {
    return { success: false, error: "Please enter your email or username" };
  }
  if (!password || !password.trim()) {
    return { success: false, error: "Please enter your password" };
  }

  // Hardcoded test credentials (replace with API call)
  if (identifier === "testuser" && password === "password123") {
    return {
      success: true,
      user: {
        id: "usr_001",
        username: "testuser",
        name: "Test User",
        email: "testuser@example.com",
        phone: "+977 98765 43210",
        joinDate: "2026-01-15",
        avatar: null,
      },
    };
  }

  return {
    success: false,
    error: "Invalid credentials. Use testuser / password123",
  };
};

/**
 * Validate registration form
 * @param {{ name, email, phone, password, confirmPassword }} formData
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
export const validateRegistration = (formData) => {
  const { name, email, phone, password, confirmPassword } = formData;

  if (!name || name.trim().length < 2) {
    return { success: false, error: "Name must be at least 2 characters" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address" };
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone.replace(/\s/g, ""))) {
    return {
      success: false,
      error: "Please enter a valid 10-digit phone number",
    };
  }

  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  // Simulate successful registration (replace with API call)
  return {
    success: true,
    user: {
      id: "usr_new",
      username: email.split("@")[0],
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      joinDate: new Date().toISOString().split("T")[0],
      avatar: null,
    },
  };
};

/**
 * Validate password recovery email
 * @param {string} email
 * @returns {{ success: boolean, message?: string, error?: string }}
 */
export const validatePasswordRecovery = (email) => {
  if (!email || !email.trim()) {
    return { success: false, error: "Please enter your email address" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address" };
  }

  // Simulate sending recovery email (replace with API call)
  return {
    success: true,
    message: "Password reset link sent to your email",
  };
};
