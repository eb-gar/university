import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEnrollmentDto) {
    return this.prisma.enrollment.create({ data });
  }

  findAll() {
    return this.prisma.enrollment.findMany();
  }

  update(id: number, data: UpdateEnrollmentDto) {
    return this.prisma.enrollment.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.enrollment.delete({
      where: { id },
    });
  }

  async createEnrollmentWithSubjects(data: CreateEnrollmentDto, subjectIds: number[]) {
    return this.prisma.$transaction(async (prisma) => {
      const enrollment = await prisma.enrollment.create({
        data: {
          studentId: data.studentId,
          careerId: data.careerId,
          enrollmentDate: new Date(),
          status: 'ACTIVE',
        },
      });

      const registrations = await Promise.all(
        subjectIds.map(subjectId =>
          prisma.registration.create({
            data: {
              studentId: data.studentId,
              subjectId,
              academicTerm: data.academicTerm,
              registrationDate: new Date(),
              status: 'ACTIVE',
            },
          })
        )
      );

      await prisma.student.update({
        where: { id: data.studentId },
        data: { semester: data.semester },
      });

      return { enrollment, registrations };
    });
  }
}