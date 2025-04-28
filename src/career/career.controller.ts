import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('careers') //carreras
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  create(@Body() data: any) {
    return this.careerService.create(data);
  }

  @Get()
  findAll() {
    return this.careerService.findAll();
  }

  @Get(':careerId/students')
  countStudents(@Param('careerId') careerId: string) {
    return this.careerService.countStudents(+careerId);
  }

  @Get(':careerId/teachers')
  countTeachers(@Param('careerId') careerId: string) {
    return this.careerService.countTeachers(+careerId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.careerService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.careerService.remove(+id);
  }
}
