import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service'; // Importa Prisma
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService, // Añade Prisma
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true; // Si no hay roles requeridos, permite acceso

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Consulta el usuario con su rol desde la BD
    const userWithRole = await this.prisma.user.findUnique({
      where: { id: user.sub },
      include: { role: true },
    });

    if (!userWithRole || !requiredRoles.includes(userWithRole.role.name)) {
      throw new ForbiddenException('No tienes permiso para acceder a este recurso');
    }

    return true;
  }
}