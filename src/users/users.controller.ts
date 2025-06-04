import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/interfaces/auth.interfaces';
import { ChangeRoleDto } from './dto/change-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('me')
  @Auth()
  async getMe(@GetUser() user: JwtPayload) {
    return this.prisma.user.findUnique({
      where: { id: user.sub },
      select: {
        id: true,
        email: true,
        role: {
          select: {
            name: true,
            permissions: {
              select: {
                permission: {
                  select: {
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
        createdAt: true,
      },
    });
  }

  @Patch(':id/role')
  @Auth({ roles: ['ADMIN'], permissions: ['manage_roles'] })
  async changeUserRole(
    @Param('id') userId: string,
    @Body() changeRoleDto: ChangeRoleDto,
    @GetUser() adminUser: JwtPayload,
  ) {

    const targetUser = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { role: true },
    });

    if (!targetUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (targetUser.id === adminUser.sub) {
      throw new ForbiddenException('No puedes cambiar tu propio rol');
    }

    const newRole = await this.prisma.role.findUnique({
      where: { name: changeRoleDto.role },
      include: { permissions: { include: { permission: true } } },
    });

    if (!newRole) {
      throw new NotFoundException(`Rol ${changeRoleDto.role} no encontrado`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: Number(userId) },
      data: { roleId: newRole.id },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role.name,
      permissions: updatedUser.role.permissions.map((rp) => rp.permission.name),
    };
  }

  @Get('roles/available')
  @Auth({ roles: ['ADMIN'], permissions: ['view_roles'] })
  async getAvailableRoles() {
    return this.prisma.role.findMany({
      select: {
        id: true,
        name: true,
        permissions: {
          select: {
            permission: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });
  }

  @Get()
  @Auth({ roles: ['ADMIN'], permissions: ['view_users'] })
  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}