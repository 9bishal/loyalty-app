// Authentication business logic
export const validateLogin = (username, password) => {
  // Hardcoded test credentials logic
  if (username === "testuser" && password === "password123") {
    return {
      success: true,
      user: { username: "testuser", name: "Test User" },
    };
  }
  return {
    success: false,
    error: "Invalid Credentials. Use testuser / password123",
  };
};
