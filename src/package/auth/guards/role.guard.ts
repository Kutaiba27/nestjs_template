import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AccountRole } from "@Modules/account/data";
import { CHECK_ROLES_KEY } from "@Package/api";
import { ErrorServiceFactory } from "@Package/error";
import { AdminErrorCode } from "@Common/error";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    private readonly errorService = ErrorServiceFactory.createErrorService(RoleGuard.name);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles: {values: AccountRole[]} = this.reflector.get<{values: AccountRole[]}>(CHECK_ROLES_KEY, context.getHandler());
        const { user } = context.switchToHttp().getRequest();
        if (!user) this.errorService.throw(AdminErrorCode.AUTH.NOT_ALLOWED_TO_ACCESS);
        console.log(requiredRoles?.values?.includes(user.accountRole));
        console.log(user.accountRole);
        console.log(requiredRoles?.values);
        if (!requiredRoles?.values?.includes(user.accountRole)) this.errorService.throw(AdminErrorCode.AUTH.NOT_ALLOWED_TO_ACCESS);
        return true;
    }
}