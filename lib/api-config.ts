export const API_CONFIG = {
  // Base URLs
  get BASE_URL() {
    if (typeof window !== "undefined") {
      // Return injected URL from window or localStorage if present (e.g. injected by app wrapper)
      const windowApiUrl = (window as any).NEXT_PUBLIC_API_BASE_URL;
      const localStorageApiUrl = localStorage.getItem("NEXT_PUBLIC_API_BASE_URL");
      
      return (
        windowApiUrl ||
        localStorageApiUrl ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        ""
      );
    }
    // Fallback on server or if window undefined
    return process.env.NEXT_PUBLIC_API_BASE_URL || "";
  },

  // Timeouts
  REQUEST_TIMEOUT: 30000, // 30 seconds

  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second

  // Cache configuration
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

  // API Endpoints
  ENDPOINTS: {
    // Recommendations
    RECOMMEND_BY_VILLAGE: "/api/recommend-by-village",
    RECOMMEND_BY_COORDINATES: "/api/recommend-by-coordinates",

    // Information
    MODEL_INFO: "/api/model-info",
    SUPPORTED_CROPS: "/api/supported-crops",
    AGRO_ZONES: "/api/agro-zones",

    // Authentication (for future implementation)
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    RESET_PASSWORD: "/api/auth/reset-password",
    REFRESH_TOKEN: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
  },

  // Error messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: "Network error. Please check your connection and try again.",
    SERVER_ERROR: "Server error. Please try again later.",
    VALIDATION_ERROR: "Please check your input and try again.",
    UNAUTHORIZED: "Please sign in to continue.",
    FORBIDDEN: "You do not have permission to perform this action.",
    NOT_FOUND: "The requested resource was not found.",
    TIMEOUT: "Request timed out. Please try again.",
    UNKNOWN: "An unexpected error occurred. Please try again.",
  },

  // Success messages
  SUCCESS_MESSAGES: {
    RECOMMENDATION_RECEIVED: "Crop recommendation received successfully!",
    LOGIN_SUCCESS: "Signed in successfully!",
    REGISTER_SUCCESS: "Account created successfully!",
    PASSWORD_RESET: "Password reset instructions sent to your email.",
    CONTACT_FORM_SENT: "Your message has been sent successfully!",
  },
} as const;
