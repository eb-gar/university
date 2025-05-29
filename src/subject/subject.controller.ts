import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects')  //materias
export class SubjectController {
  constructor(private readonly subjectservice: SubjectService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() data: any) {
    return this.subjectservice.create(data);
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher, ValidRoles.student)
  @Get()
  findAll() {
    return this.subjectservice.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Get(':subjectId/students')
  getStudents(@Param('subjectId') subjectId: string) {
    return this.subjectservice.getStudents(+subjectId);
  }

  @Auth(ValidRoles.admin)
  @Get(':subjectId/teachers')
  getTeachers(@Param('subjectId') subjectId: string) {
    return this.subjectservice.getTeachers(+subjectId);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.subjectservice.update(+id, data);
  }
  
  @Auth(ValidRoles.admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subjectservice.remove(+id);
  }
}
