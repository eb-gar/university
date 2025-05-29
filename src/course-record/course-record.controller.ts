import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseRecordService } from './course-record.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('course-record')
export class CourseRecordController {
  constructor(private readonly courseRecordService: CourseRecordService) {}

  @Auth(ValidRoles.admin, ValidRoles.teacher) 
  @Post()
  create(@Body() data: any) {
    return this.courseRecordService.create(data);
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher, ValidRoles.student)
  @Get()
  findAll() {
    return this.courseRecordService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher, ValidRoles.student)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseRecordService.findOne(+id);
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.courseRecordService.update(+id, data);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseRecordService.remove(+id);
  }
}
