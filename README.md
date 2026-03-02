# 🎖️ Loyalty Rewards App

A beautifully designed mobile loyalty rewards application built with React Native and Expo. Users earn loyalty points through their shopping activity on e-commerce platforms, track their rewards tier progress, and redeem points for exclusive offers.

## 📸 Screens

- **Login** — Secure authentication screen
- **Home** — Loyalty dashboard with points balance, tier progress, rewards catalog, and transaction history
- **Profile** — User profile with stats, loyalty tier visualization, and settings

## 🚀 Tech Stack

| Technology                  | Usage                                                                       |
| --------------------------- | --------------------------------------------------------------------------- |
| **React Native**            | Cross-platform mobile framework                                             |
| **Expo** (Managed Workflow) | Development toolchain & runtime                                             |
| **JavaScript** (ES2022)     | Programming language                                                        |
| **React Context API**       | Global state management                                                     |
| **React Navigation**        | Bottom tab navigation (`@react-navigation/bottom-tabs`)                     |
| **Unistyles Wrapper**       | Custom `createStyleSheet` / `useStyles` theming system (Expo Go compatible) |
| **@expo/vector-icons**      | Ionicons icon library                                                       |
| **AsyncStorage**            | Persistent local state storage                                              |

## 🔑 Test Credentials

| Field        | Value         |
| ------------ | ------------- |
| **Username** | `testuser`    |
| **Password** | `password123` |

## 🌟 Features

- **Loyalty Points Dashboard** — View your total earned points at a glance
- **Tier System** — Bronze → Silver → Gold → Platinum progression with progress bar
- **Rewards Catalog** — Horizontally scrollable reward cards with point costs
- **Transaction History** — Track where and how you earned your loyalty points
- **Profile Stats** — Total spent, orders, points earned overview
- **Persistent State** — Data persists across app restarts via AsyncStorage
- **Smooth Animations** — Fade-in and slide-up entrance animations

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- `npm` or `yarn`
- [Expo Go](https://expo.dev/client) app on your iOS or Android device

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/9bishal/loyalty-app.git
   cd loyalty-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npx expo start -c
   ```

4. Scan the QR code with **Expo Go** on your phone.

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Header)
├── data/             # Static loyalty data (transactions, tiers, rewards)
├── navigation/       # Bottom tab navigator (Home, Profile)
├── screens/          # Screen components (Login, Home, Profile, Splash)
├── services/         # Business logic (auth, rewards, storage)
├── store/            # React Context global state
└── styles/           # Theme config & unistyles wrapper
```

## 📜 License

This project is for educational and demonstration purposes.
