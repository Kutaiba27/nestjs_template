/**
 * Redis TTL constants in milliseconds
 */
export const RedisTTL = {
    /** 5 minutes in milliseconds */
    FIVE_MINUTES: 5 * 60 * 1000,
    /** 15 minutes in milliseconds */
    FIFTEEN_MINUTES: 15 * 60 * 1000,
    /** 1 hour in milliseconds */
    ONE_HOUR: 60 * 60 * 1000,
    /** Session token TTL (5 minutes) */
    SESSION_TOKEN: 5 * 60 * 1000,
    /** OTP TTL (5 minutes) */
    OTP: 5 * 60 * 1000,
    /** Forgot password TTL (15 minutes) */
    FORGOT_PASSWORD: 15 * 60 * 1000,
} as const;