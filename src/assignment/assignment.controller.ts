import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Auth('ADMIN', 'TEACHER')
  @Post()
  create(@Body() data: CreateAssignmentDto) {
    return this.assignmentService.create(data);
  }

  @Auth('ADMIN', 'TEACHER', 'STUDENT')
  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @Auth('ADMIN', 'TEACHER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAssignmentDto) {
    return this.assignmentService.update(+id, data);
  }

  @Auth('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }
}
