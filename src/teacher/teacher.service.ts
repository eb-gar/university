import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTeacherDto) {
    return this.prisma.teacher.create({ data });
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  update(id: number, data: UpdateTeacherDto) {
    return this.prisma.teacher.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
