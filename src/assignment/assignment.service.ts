import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAssignmentDto) {
    return this.prisma.assignment.create({ data });
  }

  findAll() {
    return this.prisma.assignment.findMany();
  }

  update(id: number, data: UpdateAssignmentDto) {
    return this.prisma.assignment.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.assignment.delete({
      where: { id },
    });
  }
}
