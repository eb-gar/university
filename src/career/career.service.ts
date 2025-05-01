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

  async getStudentsByCareer(careerId: number) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { careerId },
      include: {
        student: true, 
      },
    });
    return enrollments.map((e) => e.student);
  }
  

  async getTeachersByCareer(careerId: number) {
    const subjects = await this.prisma.subject.findMany({
      where: { careerId },
      select: { id: true },
    });
  
    const subjectIds = subjects.map((s) => s.id);
  
    const assignments = await this.prisma.assignment.findMany({
      where: {
        subjectId: { in: subjectIds },
      },
      include: {
        teacher: true, 
      },
    });
  
    return assignments.map((a) => a.teacher);
  }
  

  update(id: number, data: any) {
    return this.prisma.career.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.career.delete({
      where: { id },
    });
  }
}
