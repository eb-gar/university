import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseRecordDto } from './dto/create-course-record.dto';
import { UpdateCourseRecordDto } from './dto/update-course-record.dto';

@Injectable()
export class CourseRecordService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCourseRecordDto) {
    return this.prisma.courseRecord.create({ data });
  }

  findAll() {
    return this.prisma.courseRecord.findMany();
  }

  findOne(id: number) {
    return this.prisma.courseRecord.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateCourseRecordDto) {
    return this.prisma.courseRecord.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.courseRecord.delete({
      where: { id },
    });
  }
}
