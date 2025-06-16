import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Roles } from './roles.decorator';
import { Permissions } from './permissions.decorator';

interface AuthOptions {
  roles?: string[];
  permissions?: string[];
  isPublic?: boolean;
}

export function Auth(options?: AuthOptions) {
  if (options?.isPublic) {
    return applyDecorators();
  }

  const decorators = [UseGuards(JwtAuthGuard)];

  if (options?.roles && options.roles.length > 0) {
    decorators.push(Roles(...options.roles));
    decorators.push(UseGuards(RolesGuard));
  }

  if (options?.permissions && options.permissions.length > 0) {
    decorators.push(Permissions(...options.permissions));
    decorators.push(UseGuards(PermissionsGuard));
  }

  return applyDecorators(...decorators);
}