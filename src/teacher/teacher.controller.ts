import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherservice: TeacherService) {}

  @Post()
  create(@Body() data: any) {
    return this.teacherservice.create(data);
  }

  @Get()
  findAll() {
    return this.teacherservice.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.teacherservice.update(+id, data);
  }
    
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teacherservice.remove(+id);
  }
}
