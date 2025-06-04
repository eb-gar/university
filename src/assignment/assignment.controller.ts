import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { PaginationDto } from '.././pagination/pagination.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  @Auth({
    roles: ['TEACHER', 'ADMIN'],
    permissions: ['manage_assignments'],
  })
  create(@Body() data: CreateAssignmentDto) {
    return this.assignmentService.create(data);
  }

  @Get()
  @Auth({
    roles: ['STUDENT', 'TEACHER', 'ADMIN'],
    permissions: ['view_assignments'],
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.assignmentService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth({
    roles: ['STUDENT', 'TEACHER', 'ADMIN'],
    permissions: ['view_assignments'],
  })
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(+id);
  }

  @Patch(':id')
  @Auth({
    roles: ['TEACHER', 'ADMIN'],
    permissions: ['manage_assignments'],
  })
  update(@Param('id') id: string, @Body() data: UpdateAssignmentDto) {
    return this.assignmentService.update(+id, data);
  }

  @Delete(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['delete_assignments'],
  })
  delete(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }
}