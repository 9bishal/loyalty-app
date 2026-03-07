// Centralized API service for backend integration
// ================================================
// HOW TO INTEGRATE:
// 1. Set BASE_URL to your backend server address
// 2. Each method maps to a backend endpoint
// 3. Services (authService, rewardsService, etc.) call these methods
// 4. Replace mock data returns with these API calls
// ================================================

import axios from "axios";

const BASE_URL = "https://api.xyz-ecommerce.com/v1"; // ← Change this to your backend URL

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Core axios wrapper with error handling, auth headers, and JSON parsing.
 * All API calls go through this method.
 *
 * @param {string} endpoint - API endpoint (e.g. "/auth/login")
 * @param {object} options - { method, body, headers }
 * @returns {Promise<object>} - Parsed JSON response
 */
const request = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {}, token } = options;

  const config = {
    method,
    url: endpoint,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    data: body,
  };

  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Something went wrong",
        data: error.response.data,
      };
    } else {
      throw {
        status: 0,
        message: "Network error. Please check your connection.",
        data: null,
      };
    }
  }
};

// =============================================
// AUTH API ENDPOINTS
// =============================================

export const authAPI = {
  /**
   * POST /auth/login
   * @param {{ identifier: string, password: string }} credentials
   */
  login: (credentials) =>
    request("/auth/login", { method: "POST", body: credentials }),

  /**
   * POST /auth/register
   * @param {{ name, email, phone, password }} userData
   */
  register: (userData) =>
    request("/auth/register", { method: "POST", body: userData }),

  /**
   * POST /auth/forgot-password
   * @param {{ email: string }} data
   */
  forgotPassword: (data) =>
    request("/auth/forgot-password", { method: "POST", body: data }),

  /**
   * POST /auth/logout
   */
  logout: (token) => request("/auth/logout", { method: "POST", token }),
};

// =============================================
// PROFILE API ENDPOINTS
// =============================================

export const profileAPI = {
  /**
   * GET /profile
   */
  getProfile: (token) => request("/profile", { token }),

  /**
   * PUT /profile
   * @param {object} updates - Fields to update
   */
  updateProfile: (updates, token) =>
    request("/profile", { method: "PUT", body: updates, token }),
};

// =============================================
// POINTS API ENDPOINTS
// =============================================

export const pointsAPI = {
  /**
   * GET /points/balance
   */
  getBalance: (token) => request("/points/balance", { token }),

  /**
   * GET /points/transactions?type=all|earn|redeem|referral
   * @param {string} type - Filter type
   */
  getTransactions: (type = "all", token) =>
    request(`/points/transactions?type=${type}`, { token }),

  /**
   * GET /points/stats
   */
  getStats: (token) => request("/points/stats", { token }),

  /**
   * GET /points/tier
   */
  getTierInfo: (token) => request("/points/tier", { token }),
};

// =============================================
// REWARDS API ENDPOINTS
// =============================================

export const rewardsAPI = {
  /**
   * GET /rewards?category=all|coupons|cashback|delivery|exclusive
   * @param {string} category - Filter category
   */
  getRewards: (category = "all", token) =>
    request(`/rewards?category=${category}`, { token }),

  /**
   * GET /rewards/:id
   * @param {number} rewardId
   */
  getRewardById: (rewardId, token) =>
    request(`/rewards/${rewardId}`, { token }),

  /**
   * GET /rewards/categories
   */
  getCategories: (token) => request("/rewards/categories", { token }),

  /**
   * POST /rewards/:id/redeem
   * @param {number} rewardId
   */
  redeemReward: (rewardId, token) =>
    request(`/rewards/${rewardId}/redeem`, { method: "POST", token }),
};

// =============================================
// REFERRALS API ENDPOINTS
// =============================================

export const referralsAPI = {
  /**
   * GET /referrals
   */
  getReferralInfo: (token) => request("/referrals", { token }),

  /**
   * GET /referrals/history
   */
  getReferralHistory: (token) => request("/referrals/history", { token }),

  /**
   * GET /referrals/stats
   */
  getReferralStats: (token) => request("/referrals/stats", { token }),
};

// =============================================
// NOTIFICATIONS API ENDPOINTS
// =============================================

export const notificationsAPI = {
  /**
   * GET /notifications
   */
  getNotifications: (token) => request("/notifications", { token }),

  /**
   * PUT /notifications/:id/read
   * @param {number} notificationId
   */
  markAsRead: (notificationId, token) =>
    request(`/notifications/${notificationId}/read`, { method: "PUT", token }),

  /**
   * PUT /notifications/read-all
   */
  markAllAsRead: (token) =>
    request("/notifications/read-all", { method: "PUT", token }),

  /**
   * GET /notifications/unread-count
   */
  getUnreadCount: (token) => request("/notifications/unread-count", { token }),
};
