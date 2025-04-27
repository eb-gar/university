import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.student.create({ data });
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  async getSubjectsAndCareers(studentId: number) {
    const subjects = await this.prisma.registration.findMany({
      where: { studentId },
      include: { subject: true },
    });

    const careers = await this.prisma.enrollment.findMany({
      where: { studentId },
      include: { career: true },
    });

    return {
      subjects: subjects.map((r) => r.subject),
      careers: careers.map((e) => e.career),
    };
  }

  update(id: number, data: any) {
    return this.prisma.student.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}
