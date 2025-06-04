import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('students')
export class StudentController {
  constructor(private readonly studentservice: StudentService) {}

  @Post()
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_students'],
  })
  create(@Body() data: CreateStudentDto) {
    return this.studentservice.create(data);
  }

  @Get()
  @Auth({
    roles: ['ADMIN', 'TEACHER'],
    permissions: ['view_students'],
  })
  findAll() {
    return this.studentservice.findAll();
  }

  @Get(':studentId/subjects-careers')
  @Auth({
    roles: ['ADMIN', 'TEACHER', 'STUDENT'],
    permissions: ['view_student_data'],
  })
  getSubjectsAndCareers(@Param('studentId') studentId: string) {
    return this.studentservice.getSubjectsAndCareers(+studentId);
  }

  @Patch(':studentId')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_students'],
  })
  update(@Param('studentId') studentId: string, @Body() data: UpdateStudentDto) {
    return this.studentservice.update(+studentId, data);
  }

  @Delete(':studentId')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['delete_students'],
  })
  delete(@Param('studentId') studentId: string) {
    return this.studentservice.remove(+studentId);
  }
}