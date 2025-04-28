import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollments') //matrículas
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  create(@Body() data: any) {
    return this.enrollmentService.create(data);
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.enrollmentService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
