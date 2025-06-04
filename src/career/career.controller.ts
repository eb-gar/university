import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_careers'],
  })
  create(@Body() data: CreateCareerDto) {
    return this.careerService.create(data);
  }

  @Get()
  @Auth({
    roles: ['ADMIN', 'TEACHER', 'STUDENT'],
    permissions: ['view_careers'],
  })
  findAll() {
    return this.careerService.findAll();
  }

  @Get(':careerId/students')
  @Auth({
    roles: ['ADMIN', 'TEACHER'],
    permissions: ['view_students'],
  })
  async getStudentsByCareer(@Param('careerId') careerId: string) {
    return this.careerService.getStudentsByCareer(+careerId);
  }

  @Get(':careerId/teachers')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['view_teachers'],
  })
  async getTeachersByCareer(@Param('careerId') careerId: string) {
    return this.careerService.getTeachersByCareer(+careerId);
  }

  @Patch(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_careers'],
  })
  update(@Param('id') id: string, @Body() data: UpdateCareerDto) {
    return this.careerService.update(+id, data);
  }

  @Delete(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['delete_careers'],
  })
  delete(@Param('id') id: string) {
    return this.careerService.remove(+id);
  }
}