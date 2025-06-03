import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherservice: TeacherService) {}

  @Auth('ADMIN')
  @Post()
  create(@Body() data: CreateTeacherDto) {
    return this.teacherservice.create(data);
  }

  @Auth('ADMIN', 'TEACHER')
  @Get()
  findAll() {
    return this.teacherservice.findAll();
  }

  @Auth('ADMIN', 'TEACHER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTeacherDto) {
    return this.teacherservice.update(+id, data);
  }

  @Auth('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teacherservice.remove(+id);
  }
}
