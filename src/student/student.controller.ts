import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentservice: StudentService) {}

  @Post()
  create(@Body() data: any) {
    return this.studentservice.create(data);
  }

  @Get()
  findAll() {
    return this.studentservice.findAll();
  }

  @Get(':studentId/subjects-careers')
  getSubjectsAndCareers(@Param('studentId') studentId: string) {
    return this.studentservice.getSubjectsAndCareers(+studentId);
  }

  @Patch(':studentId')
  update(@Param('studentId') studentId: string, @Body() data: any) {
    return this.studentservice.update(+studentId, data);
  }

  @Delete(':studentId')
  delete(@Param('studentId') studentId: string) {
    return this.studentservice.remove(+studentId);
  }
}
