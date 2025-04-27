import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  create(@Body() data: any) {
    return this.assignmentService.create(data);
  }

  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.assignmentService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }
}
