import { SetMetadata } from "@nestjs/common";

export const CHECK_ROLES_KEY = "user-role";
export const UserTypesMetadata = (values: string[]) =>
  SetMetadata(CHECK_ROLES_KEY, { values });
