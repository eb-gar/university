import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects')  // materias
export class SubjectController {
  constructor(private readonly subjectservice: SubjectService) {}

  @Auth('ADMIN')
  @Post()
  create(@Body() data: CreateSubjectDto) {
    return this.subjectservice.create(data);
  }

  @Auth('ADMIN', 'TEACHER', 'STUDENT')
  @Get()
  findAll() {
    return this.subjectservice.findAll();
  }

  @Auth('ADMIN', 'TEACHER')
  @Get(':subjectId/students')
  getStudents(@Param('subjectId') subjectId: string) {
    return this.subjectservice.getStudents(+subjectId);
  }

  @Auth('ADMIN')
  @Get(':subjectId/teachers')
  getTeachers(@Param('subjectId') subjectId: string) {
    return this.subjectservice.getTeachers(+subjectId);
  }

  @Auth('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateSubjectDto) {
    return this.subjectservice.update(+id, data);
  }

  @Auth('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subjectservice.remove(+id);
  }
}
