import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseRecordService } from './course-record.service';

@Controller('course-record')
export class CourseRecordController {
  constructor(private readonly courseRecordService: CourseRecordService) {}

  @Post()
  create(@Body() data: any) {
    return this.courseRecordService.create(data);
  }

  @Get()
  findAll() {
    return this.courseRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseRecordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.courseRecordService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseRecordService.remove(+id);
  }
}
