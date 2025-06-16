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

  async getFilteredSubjects(
  careerId?: number,
  semester?: number,
  search?: string
) {
  return this.prisma.subject.findMany({
    where: {
      AND: [
        careerId ? { careerId } : {},
        semester ? { semester } : {},
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        } : {}
      ]
    },
    include: {
      career: {
        select: {
          name: true,
          faculty: true
        }
      }
    },
    orderBy: {
      semester: 'asc'
    }
  });
}

async getSubjectDetails(id: number) {
  return this.prisma.subject.findUnique({
    where: { id },
    include: {
      career: {
        select: {
          name: true,
          faculty: true,
          level: true
        }
      },
      prerequisites: {
        select: {
          id: true,
          name: true,
          semester: true
        }
      },
      requiredFor: {
        select: {
          id: true,
          name: true,
          semester: true
        }
      },
      _count: {
        select: {
          registrations: true,
          assignments: true
        }
      }
    }
  });
}

async getSubjectsWithPrerequisitesAndStats() {
  return this.prisma.subject.findMany({
    include: {
      prerequisites: {
        select: {
          id: true,
          name: true,
          semester: true
        }
      },
      _count: {
        select: {
          registrations: true,
          assignments: true
        }
      },
      career: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      semester: 'asc'
    }
  });
}

async getSubjectsWithMostTeachers() {
  return this.prisma.$queryRaw`
    SELECT 
      s.id,
      s.name,
      COUNT(DISTINCT a.teacherId) as teacher_count
    FROM "Subject" s
    LEFT JOIN "Assignment" a ON s.id = a.subjectId
    GROUP BY s.id
    ORDER BY teacher_count DESC
    LIMIT 10
  `;
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
