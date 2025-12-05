export const AdminErrorCode = {
  // General
  GENERAL: {
    SERVER_ERROR: { code: 3000, message: "Server error" },
  },
  // auth
  AUTH: {
    NOT_ADMIN: { code: 4000, message: "Not admin" },
    OTP_EXPIRED: { code: 4001, message: "OTP expired" },
    INVALID_OTP: { code: 4002, message: "Invalid OTP" },
    INVALID_CREDENTIALS: { code: 4003, message: "Invalid credentials" },
    INVALID_RESET_TOKEN: { code: 4004, message: "Invalid reset token" },
    NOT_ALLOWED_TO_ACCESS: { code: 4005, message: "Not allowed to access" },
    INVALID_TOKEN: { code: 4009, message: "Invalid token" },
    
  },


  // account
  ACCOUNT: {
    ACCOUNT_NOT_FOUND: { code: 5001, message: "Account not found" },
    ACCOUNT_ALREADY_EXISTS: { code: 5002, message: "Account already exists" },
    ACCOUNT_NOT_ACTIVE: { code: 5003, message: "Account not active" },
    ACCOUNT_NOT_CONFIRMED: { code: 5004, message: "Account not confirmed" },
    NOT_SUPER_ADMIN: { code: 5005, message: "Not super admin" },
    OLD_PASSWORD_NOT_CORRECT: { code: 5006, message: "Old password not correct" },
    CAN_NOT_DELETE_YOUR_SELF: { code: 5007, message: "Can not delete your self" },
    USERNAME_OR_PASSWORD_NOT_CORRECT: { code: 5008, message: "Username or password not correct" },
    HAVE_FORGET_REQUEST_BEFORE: { code: 5009, message: "Have forget request before" },
    CHANGE_PASSWORD_MUST_BE_FALSE: { code: 5010, message: "Change password must be false" },
    DUPLICATED_EMAIL: { code: 5011, message: "Duplicated email" },
    DUPLICATED_PHONE_NUMBER: { code: 5012, message: "Duplicated phone number" },
    PHONE_NUMBER_EXIST_BEFORE: { code: 5013, message: "Phone number exist before" },
    LOG_IN_FAILED: { code: 5014, message: "Log in failed" },
  },

//   email
  MAIL: {
    MAIL_ERROR: { code: 60001, message: "Mail error" },
  },

//  validation
  VALIDATION: {
    VALIDATION_ERROR: { code: 70000, message: "Validation error" },
  },
} as const;

export type AdminErrorCode = typeof AdminErrorCode[keyof typeof AdminErrorCode];


