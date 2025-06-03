import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
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

  @Auth('ADMIN')
  @Post()
  create(@Body() data: CreateStudentDto) {
    return this.studentservice.create(data);
  }

  @Auth('ADMIN', 'TEACHER')
  @Get()
  findAll() {
    return this.studentservice.findAll();
  }

  @Auth('ADMIN', 'STUDENT')
  @Get(':studentId/subjects-careers')
  getSubjectsAndCareers(@Param('studentId') studentId: string) {
    return this.studentservice.getSubjectsAndCareers(+studentId);
  }

  @Auth('ADMIN', 'STUDENT')
  @Patch(':studentId')
  update(@Param('studentId') studentId: string, @Body() data: UpdateStudentDto) {
    return this.studentservice.update(+studentId, data);
  }

  @Auth('ADMIN')
  @Delete(':studentId')
  delete(@Param('studentId') studentId: string) {
    return this.studentservice.remove(+studentId);
  }
}
