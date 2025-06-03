import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserLoginPayload } from './Interfaces/valid-roles.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      include: { role: true }, 
    });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        email: user.email,
        role: user.role.name, 
      };
    }
    return null;
  }

  async login(user: UserLoginPayload) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwt.sign(payload),
    };
  }

  async register(data: { email: string; password: string; role: string }) {
    try {
      const role = await this.prisma.roleModel.findUnique({
        where: { name: data.role },
      });

      if (!role) {
        throw new Error(`Role ${data.role} not found`);
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: { connect: { id: role.id } },
        },
        include: {
          role: true, 
        },
      });

      return this.login({
        id: user.id,
        email: user.email,
        role: user.role.name,
      });
    } catch (error) {
      console.error('Error en register():', error);
      throw error;
    }
  }
}
