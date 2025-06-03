import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSubjectDto) {
    return this.prisma.subject.create({ data });
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  async getStudents(subjectId: number) {
    const registrations = await this.prisma.registration.findMany({
      where: { subjectId },
      include: { student: true },
    });

    return registrations.map((r) => r.student);
  }

  async getTeachers(subjectId: number) {
    const assignments = await this.prisma.assignment.findMany({
      where: { subjectId },
      include: { teacher: true },
      distinct: ['teacherId'],
    });

    return assignments.map((a) => a.teacher);
  }

  update(id: number, data: UpdateSubjectDto) {
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
