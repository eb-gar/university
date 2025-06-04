import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects') // materias
export class SubjectController {
  constructor(private readonly subjectservice: SubjectService) {}

  @Post()
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_subjects'],
  })
  create(@Body() data: CreateSubjectDto) {
    return this.subjectservice.create(data);
  }

  @Get()
  @Auth({
    roles: ['ADMIN', 'TEACHER', 'STUDENT'],
    permissions: ['view_subjects'],
  })
  findAll() {
    return this.subjectservice.findAll();
  }

  @Get(':subjectId/students')
  @Auth({
    roles: ['ADMIN', 'TEACHER'],
    permissions: ['view_subject_students'],
  })
  getStudents(@Param('subjectId') subjectId: string) {
    return this.subjectservice.getStudents(+subjectId);
  }

  @Get(':subjectId/teachers')
  @Auth({
    roles: ['ADMIN', 'STUDENT'],
    permissions: ['view_subject_teachers'],
  })
  getTeachers(@Param('subjectId') subjectId: string) {
    return this.subjectservice.getTeachers(+subjectId);
  }

  @Patch(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_subjects'],
  })
  update(@Param('id') id: string, @Body() data: UpdateSubjectDto) {
    return this.subjectservice.update(+id, data);
  }

  @Delete(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['delete_subjects'],
  })
  delete(@Param('id') id: string) {
    return this.subjectservice.remove(+id);
  }
}