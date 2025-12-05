import { applyDecorators, Controller, UseGuards, UseInterceptors, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/package/auth';
import { PathPrefixEnum } from '../enum';
import { ValidationPipeDecorator } from './validation-pipe.decorator';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';

export function AuthWebController(options: { prefix: string }) {
  return applyDecorators(
    Controller({ path: `${PathPrefixEnum.WEB}/${options.prefix}` }),
    UseGuards(JwtAuthGuard),
    ValidationPipeDecorator({}),
    ApiTags(`${PathPrefixEnum.WEB} ${options.prefix}`),
    ApiBearerAuth(),
  )
}

export function WebController(options: { prefix: string }) {
  return applyDecorators(
    Controller({ path: `${PathPrefixEnum.WEB}/${options.prefix}` }),
    ValidationPipeDecorator({}),
    ApiTags(`${PathPrefixEnum.WEB} ${options.prefix}`),
  )
}

export function AdminController(options: { prefix: string }) {
  return applyDecorators(
    Controller({ path: `${PathPrefixEnum.ADMIN}/${options.prefix}` }),
    UseGuards(JwtAuthGuard),
    ValidationPipeDecorator({}),
    ApiTags(`${PathPrefixEnum.ADMIN} ${options.prefix}`),
    ApiBearerAuth(),
  )
}

