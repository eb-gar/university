import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async registerStudentToSubject(studentId: number, subjectId: number) {
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Estudiante no encontrado');

    const subject = await this.prisma.subject.findUnique({ 
      where: { id: subjectId },
      include: { prerequisites: true }
    });
    if (!subject) throw new NotFoundException('Materia no encontrada');

    const existingRegistration = await this.prisma.registration.findFirst({
      where: { studentId, subjectId },
    });
    if (existingRegistration) throw new BadRequestException('El estudiante ya está registrado');

    if (subject.prerequisites && subject.prerequisites.length > 0) {
      const passedPrerequisites = await this.prisma.registration.count({
        where: {
          studentId,
          subjectId: { in: subject.prerequisites.map(p => p.id) },
          status: 'PASSED',
        },
      });

      if (passedPrerequisites < subject.prerequisites.length) {
        throw new ForbiddenException('No cumple con los prerrequisitos');
      }
    }

    return this.prisma.registration.create({
      data: {
        studentId,
        subjectId,
        registrationDate: new Date(),
        status: 'ACTIVE',
      },
    });
  }
}
 