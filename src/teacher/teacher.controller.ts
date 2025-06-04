import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherservice: TeacherService) {}

  @Post()
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_teachers'],
  })
  create(@Body() data: CreateTeacherDto) {
    return this.teacherservice.create(data);
  }

  @Get()
  @Auth({
    roles: ['ADMIN', 'TEACHER', 'STUDENT'],
    permissions: ['view_teachers'],
  })
  findAll() {
    return this.teacherservice.findAll();
  }

  @Patch(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_teachers'],
  })
  update(@Param('id') id: string, @Body() data: UpdateTeacherDto) {
    return this.teacherservice.update(+id, data);
  }

  @Delete(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['delete_teachers'],
  })
  delete(@Param('id') id: string) {
    return this.teacherservice.remove(+id);
  }
}
