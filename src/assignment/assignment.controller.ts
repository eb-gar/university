import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('assignments')  //inscripciones
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Post()
  create(@Body() data: any) {
    return this.assignmentService.create(data);
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher, ValidRoles.student)
  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.assignmentService.update(+id, data);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }
}
