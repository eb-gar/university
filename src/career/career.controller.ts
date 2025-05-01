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
  async getStudentsByCareer(@Param('careerId') careerId: string) {
    return this.careerService.getStudentsByCareer(+careerId);
  }
  
  @Get(':careerId/teachers')
async getTeachersByCareer(@Param('careerId') careerId: string) {
  return this.careerService.getTeachersByCareer(+careerId);
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
