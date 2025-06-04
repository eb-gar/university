import { SubjectResponseDto } from '../../subject/dto/subject-response.dto';
import { CareerResponseDto } from './career-response.dto';

export class CareerWithSubjectsDto extends CareerResponseDto {
  subjects: SubjectResponseDto[];
}