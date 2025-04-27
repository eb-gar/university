import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseRecordDto } from './create-course-record.dto';

export class UpdateCourseRecordDto extends PartialType(CreateCourseRecordDto) {}
