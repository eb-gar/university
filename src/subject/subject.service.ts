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

  async getStudents(subjectId: number) {
    const registrations = await this.prisma.registration.findMany({
      where: { subjectId },
      include: { student: true }, // Esto incluye la información completa del estudiante
    });
  
    return registrations.map((r) => r.student);
  }
  

  async getTeachers(subjectId: number) {
    const assignments = await this.prisma.assignment.findMany({
      where: { subjectId },
      include: { teacher: true },
      distinct: ['teacherId'], // Evita que se repitan profesores
    });
  
    return assignments.map((a) => a.teacher);
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
