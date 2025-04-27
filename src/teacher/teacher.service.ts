import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.teacher.create({ data });
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }
  update(id: number, data: any) {
    return this.prisma.teacher.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
