import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PaginationDto } from '.././pagination/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { AssignmentResponseDto } from './dto/assignment-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

   async create(data: CreateAssignmentDto) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: data.teacherId },
    });
    if (!teacher) throw new NotFoundException('Profesor no encontrado');

    const subject = await this.prisma.subject.findUnique({
      where: { id: data.subjectId },
    });
    if (!subject) throw new NotFoundException('Materia no encontrada');

    return this.prisma.assignment.create({
      data,
      include: { teacher: true, subject: true },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, search } = paginationDto;
    
    const where: Prisma.AssignmentWhereInput = {};
    if (search) {
      where.OR = [
        { academicTerm: { contains: search } },
        { groupCode: { contains: search } },
        { classroom: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.assignment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { teacher: true, subject: true },
        orderBy: { id: 'desc' }, 
      }),
      this.prisma.assignment.count({ where }),
    ]);

    return {
      data: plainToInstance(AssignmentResponseDto, data),
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }
 
  async findOne(id: number) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: {
        teacher: true,
        subject: true,
      },
    });

    if (!assignment) {
      throw new NotFoundException('Asignación no encontrada');
    }

    return plainToInstance(AssignmentResponseDto, assignment);
  }

  async update(id: number, data: UpdateAssignmentDto) {

    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
    });
    if (!assignment) {
      throw new NotFoundException('Asignación no encontrada');
    }

    if (data.teacherId) {
      const teacher = await this.prisma.teacher.findUnique({
        where: { id: data.teacherId },
      });
      if (!teacher) {
        throw new NotFoundException('Profesor no encontrado');
      }
    }

    if (data.subjectId) {
      const subject = await this.prisma.subject.findUnique({
        where: { id: data.subjectId },
      });
      if (!subject) {
        throw new NotFoundException('Materia no encontrada');
      }
    }

    return this.prisma.assignment.update({
      where: { id },
      data,
      include: {
        teacher: true,
        subject: true,
      },
    });
  }

  async remove(id: number) {

    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
    });
    if (!assignment) {
      throw new NotFoundException('Asignación no encontrada');
    }

    return this.prisma.assignment.delete({
      where: { id },
    });
  }
}