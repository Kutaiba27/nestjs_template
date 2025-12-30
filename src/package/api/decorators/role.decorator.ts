import { AccountRole } from '@Modules/account';
import { applyDecorators } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { UserTypesMetadata } from './metdata.decorator';
import { RoleGuard } from '@Package/auth/guards'

export function AllowRole(...values: AccountRole[]) {
  return applyDecorators(
    UserTypesMetadata(values),
    UseGuards(RoleGuard)
  );
}
