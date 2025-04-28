import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.subject.create({ data });
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  countStudents(subjectId: number) {
    return this.prisma.registration.count({
      where: { subjectId },
    });
  }

  getTeachers(subjectId: number) {
    return this.prisma.assignment.findMany({
      where: { subjectId },
      select: {
        teacher: true,
      },
    });
  }

  update(id: number, data: any) {
    return this.prisma.subject.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
