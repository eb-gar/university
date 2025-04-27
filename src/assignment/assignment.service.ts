import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.assignment.create({ data });
  }

  findAll() {
    return this.prisma.assignment.findMany();
  }

  update(id: number, data: any) {
    return this.prisma.assignment.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.assignment.delete({
      where: { id },
    });
  }
}
