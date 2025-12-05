export const ClientSideErrorCode = {
    // auth
    AUTH: {
        INVALID_CREDENTIALS: { code: 4000, message: "Invalid credentials" },
        ACCESS_TOKEN_NOT_EXIST: { code: 4001, message: "Access token not exist" },
        OTP_TOKEN_NOT_EXIST: { code: 4002, message: "OTP token not exist" },
        EXPIRED_ACCESS_TOKEN: { code: 4003, message: "Expired access token" },
        EXPIRED_OTP_TOKEN: { code: 4004, message: "Expired OTP " },
        INVALID_OTP: { code: 4005, message: "Invalid OTP" },
        INVALID_TOKEN: { code: 4006, message: "Invalid token" },
        ACCOUNT_ALREADY_VERIFIED: { code: 4007, message: "Account already verified" },
        INVALID_FORGOT_PASSWORD_TOKEN: { code: 4008, message: "Invalid forgot password token" },
        EXPIRED_FORGOT_PASSWORD_TOKEN: { code: 4009, message: "Expired forgot password token" },
    },


    // account
    ACCOUNT: {
        ACCOUNT_NOT_FOUND: { code: 5001, message: "Account not found" },
        ACCOUNT_ALREADY_EXISTS: { code: 5002, message: "Account already exists" },
        DUPLICATED_EMAIL: { code: 5011, message: "Duplicated email" },
        DUPLICATED_PHONE_NUMBER: { code: 5012, message: "Duplicated phone number" },
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

export type ClientSideErrorCode = typeof ClientSideErrorCode[keyof typeof ClientSideErrorCode];