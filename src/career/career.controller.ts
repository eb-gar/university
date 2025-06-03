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
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@Controller('careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Auth('ADMIN', 'TEACHER')
  @Post()
  create(@Body() data: CreateCareerDto) {
    return this.careerService.create(data);
  }

  @Auth('ADMIN', 'TEACHER', 'STUDENT')
  @Get()
  findAll() {
    return this.careerService.findAll();
  }

  @Auth('ADMIN', 'TEACHER')
  @Get(':careerId/students')
  async getStudentsByCareer(@Param('careerId') careerId: string) {
    return this.careerService.getStudentsByCareer(+careerId);
  }

  @Auth('ADMIN')
  @Get(':careerId/teachers')
  async getTeachersByCareer(@Param('careerId') careerId: string) {
    return this.careerService.getTeachersByCareer(+careerId);
  }

  @Patch(':id')
  @Auth('ADMIN')
  update(@Param('id') id: string, @Body() data: UpdateCareerDto) {
    return this.careerService.update(+id, data);
  }

  @Auth('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.careerService.remove(+id);
  }
}
