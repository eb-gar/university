import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.registration.create({ data });
  }

  findAll() {
    return this.prisma.registration.findMany();
  }

  update(id: number, data: any) {
    return this.prisma.registration.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.registration.delete({
      where: { id },
    });
  }
}
