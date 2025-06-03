import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateStudentDto) {
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

  update(id: number, data: UpdateStudentDto) {
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
