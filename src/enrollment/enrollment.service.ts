import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.enrollment.create({ data });
  }

  findAll() {
    return this.prisma.enrollment.findMany();
  }

  update(id: number, data: any) {
    return this.prisma.enrollment.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.enrollment.delete({
      where: { id },
    });
  }
}
