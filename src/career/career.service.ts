import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CareerService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.career.create({ data });
  }

  findAll() {
    return this.prisma.career.findMany();
  }

  async countStudents(careerId: number) {
    return this.prisma.enrollment.count({
      where: { careerId },
    });
  }

  async countTeachers(careerId: number) {
    const subjects = await this.prisma.subject.findMany({
      where: { careerId },
      select: { id: true },
    });
    const subjectIds = subjects.map((s) => s.id);

    const teachers = await this.prisma.assignment.findMany({
      where: { subjectId: { in: subjectIds } },
      distinct: ['teacherId'],
    });

    return teachers.length;
  }

  async update(id: number, data: any) {
    return this.prisma.career.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.career.delete({
      where: { id },
    });
  }
}
