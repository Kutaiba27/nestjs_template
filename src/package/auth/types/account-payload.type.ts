import { AccountRole } from "@Modules/account";

export interface AccountPayload {
  id: string;
  email: string;
  accountRole: AccountRole;
  isVerified: boolean;
  isActive: boolean;
  resetPasswordToken?: boolean;
}