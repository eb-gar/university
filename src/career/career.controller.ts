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
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Post()
  create(@Body() data: any) {
    return this.careerService.create(data);
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher, ValidRoles.student)
  @Get()
  findAll() {
    return this.careerService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Get(':careerId/students')
  async getStudentsByCareer(@Param('careerId') careerId: string) {
    return this.careerService.getStudentsByCareer(+careerId);
  }

  @Auth(ValidRoles.admin)
  @Get(':careerId/teachers')
  @Auth(ValidRoles.admin, ValidRoles.teacher, ValidRoles.student)
  async getTeachersByCareer(@Param('careerId') careerId: string) {
    return this.careerService.getTeachersByCareer(+careerId);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() data: any) {
    return this.careerService.update(+id, data);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  @Auth(ValidRoles.admin)
  delete(@Param('id') id: string) {
    return this.careerService.remove(+id);
  }
}
