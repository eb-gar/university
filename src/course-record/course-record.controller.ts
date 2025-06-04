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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCourseRecordDto } from './dto/create-course-record.dto';
import { UpdateCourseRecordDto } from './dto/update-course-record.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('course-record')
export class CourseRecordController {
  constructor(private readonly courseRecordService: CourseRecordService) {}

  @Post()
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_course_records'],
  })
  create(@Body() data: CreateCourseRecordDto) {
    return this.courseRecordService.create(data);
  }

  @Get()
  @Auth({
    roles: ['ADMIN', 'TEACHER'],
    permissions: ['view_course_records'],
  })
  findAll() {
    return this.courseRecordService.findAll();
  }

  @Get(':id')
  @Auth({
    roles: ['ADMIN', 'TEACHER'],
    permissions: ['view_course_records'],
  })
  findOne(@Param('id') id: string) {
    return this.courseRecordService.findOne(+id);
  }

  @Patch(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_course_records'],
  })
  update(@Param('id') id: string, @Body() data: UpdateCourseRecordDto) {
    return this.courseRecordService.update(+id, data);
  }

  @Delete(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['delete_course_records'],
  })
  remove(@Param('id') id: string) {
    return this.courseRecordService.remove(+id);
  }
}
