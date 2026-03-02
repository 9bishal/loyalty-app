# Loyalty Shop App

A beautifully designed e-commerce loyalty app built with React Native and Expo. It features a complete shopping experience with a stylized UI, responsive layout, cart management, wishlisting, and a reward points system.

## 🚀 Tech Stack

- **Framework**: React Native with [Expo](https://expo.dev/) (Managed Workflow)
- **Language**: JavaScript (ES2022)
- **Navigation**: React Navigation (`@react-navigation/bottom-tabs`)
- **State Management**: React Context (`AppContext` for global state)
- **Styling**: Vanilla React Native `StyleSheet` via a lightweight, drop-in custom Unistyles wrapper (Expo Go compatible)
- **Icons**: `@expo/vector-icons` (Ionicons)

## 🔑 Test Credentials

To preview the app's features, an authentication screen acts as the gateway. You can log in using the following test credentials:

- **Username**: `testuser`
- **Password**: `password123`

## 🌟 Features

- **Storefront**: Browse available products with their prices.
- **Cart Management**: Add items to your cart, with automatic quantity aggregation and real-time total calculation.
- **Wishlist**: Toggle items to your personal wishlist, complete with localized and dynamic heart icons.
- **Dynamic Navigation Badges**: The bottom tab navigation displays interactive red numerical badges reflecting your active cart and wishlist counts.
- **Reward Points System**: Earn loyalty points upon checkout representing your purchase history.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- `npm` or `yarn`
- [Expo Go](https://expo.dev/client) app installed on your iOS or Android device

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd loyalty-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   _or_

   ```bash
   yarn install
   ```

3. Start the development server (be sure to clear cache if you run into any runtime issues):

   ```bash
   npx expo start -c
   ```

4. Open the app:
   - Scan the QR code with the **Expo Go** app on your physical device.
   - Alternatively, press `i` in the terminal to open in an iOS simulator, or `a` to open in an Android emulator.

---

_Note: This project was migrated from `react-native-unistyles` v3 to a lightweight vanilla styling wrapper in order to maintain compatibility with the Expo Go runtime without relying on custom native NitroModules._
