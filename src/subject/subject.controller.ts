import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subjects')  //materias
export class SubjectController {
  constructor(private readonly subjectservice: SubjectService) {}

  @Post()
  create(@Body() data: any) {
    return this.subjectservice.create(data);
  }

  @Get()
  findAll() {
    return this.subjectservice.findAll();
  }

  @Get(':subjectId/students')
  countStudents(@Param('subjectId') subjectId: string) {
    return this.subjectservice.countStudents(+subjectId);
  }

  @Get(':subjectId/teachers')
  getTeachers(@Param('subjectId') subjectId: string) {
    return this.subjectservice.getTeachers(+subjectId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.subjectservice.update(+id, data);
  }
  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subjectservice.remove(+id);
  }
}
