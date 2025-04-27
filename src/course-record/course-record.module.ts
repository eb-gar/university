import { Module } from '@nestjs/common';
import { CourseRecordService } from './course-record.service';
import { CourseRecordController } from './course-record.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CourseRecordController],
  providers: [CourseRecordService, PrismaService],
})
export class CourseRecordModule {}
