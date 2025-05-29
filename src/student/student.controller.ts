import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('students') //estudiantes
export class StudentController {
  constructor(private readonly studentservice: StudentService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() data: any) {
    return this.studentservice.create(data);
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Get()
  findAll() {
    return this.studentservice.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.student)
  @Get(':studentId/subjects-careers')
  getSubjectsAndCareers(@Param('studentId') studentId: string) {
    return this.studentservice.getSubjectsAndCareers(+studentId);
  }

  @Auth(ValidRoles.admin, ValidRoles.student)
  @Patch(':studentId')
  update(@Param('studentId') studentId: string, @Body() data: any) {
    return this.studentservice.update(+studentId, data);
  }

  @Auth(ValidRoles.admin)
  @Delete(':studentId')
  delete(@Param('studentId') studentId: string) {
    return this.studentservice.remove(+studentId);
  }
}
