import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const role = this.reflector.get<string>('role', context.getHandler());
        if (!role) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => user.role == role;
        return user && user.role && hasRole();
    }
}