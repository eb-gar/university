import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseRecordService } from './course-record.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCourseRecordDto } from './dto/create-course-record.dto';
import { UpdateCourseRecordDto } from './dto/update-course-record.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('course-record')
export class CourseRecordController {
  constructor(private readonly courseRecordService: CourseRecordService) {}

  @Auth('ADMIN', 'TEACHER')
  @Post()
  create(@Body() data: CreateCourseRecordDto) {
    return this.courseRecordService.create(data);
  }

  @Auth('ADMIN', 'TEACHER', 'STUDENT')
  @Get()
  findAll() {
    return this.courseRecordService.findAll();
  }

  @Auth('ADMIN', 'TEACHER', 'STUDENT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseRecordService.findOne(+id);
  }

  @Auth('ADMIN', 'TEACHER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCourseRecordDto) {
    return this.courseRecordService.update(+id, data);
  }

  @Auth('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseRecordService.remove(+id);
  }
}
