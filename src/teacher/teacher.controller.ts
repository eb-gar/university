import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teachers')  //profesores
export class TeacherController {
  constructor(private readonly teacherservice: TeacherService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() data: any) {
    return this.teacherservice.create(data);
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Get()
  findAll() {
    return this.teacherservice.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.teacherservice.update(+id, data);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teacherservice.remove(+id);
  }
}
