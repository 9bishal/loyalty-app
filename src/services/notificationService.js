// Notification business logic
// Handles notification state, filtering, and formatting

import { notifications as initialNotifications } from "../data/loyaltyData";

// In-memory notification state (replace with API/storage)
let notificationsState = [...initialNotifications];

/**
 * Get all notifications sorted by timestamp (newest first)
 * @returns {Array}
 */
export const getAllNotifications = () => {
  return [...notificationsState].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );
};

/**
 * Get unread notification count
 * @returns {number}
 */
export const getUnreadCount = () => {
  return notificationsState.filter((n) => !n.read).length;
};

/**
 * Mark a notification as read
 * @param {number} notificationId
 * @returns {Array} - Updated notifications
 */
export const markAsRead = (notificationId) => {
  notificationsState = notificationsState.map((n) =>
    n.id === notificationId ? { ...n, read: true } : n,
  );
  return getAllNotifications();
};

/**
 * Mark all notifications as read
 * @returns {Array} - Updated notifications
 */
export const markAllAsRead = () => {
  notificationsState = notificationsState.map((n) => ({ ...n, read: true }));
  return getAllNotifications();
};

/**
 * Get notification icon color by type
 * @param {string} type - Notification type
 * @returns {string} - Color hex
 */
export const getNotificationColor = (type) => {
  const colors = {
    earn: "#10B981",
    redeem: "#2563EB",
    promo: "#F59E0B",
    referral: "#8B5CF6",
  };
  return colors[type] || "#6B7280";
};

/**
 * Format notification timestamp for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Relative or formatted time
 */
export const formatNotificationTime = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
};
