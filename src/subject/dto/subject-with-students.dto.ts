import { StudentResponseDto } from '../../student/dto/student-response.dto';
import { SubjectResponseDto } from './subject-response.dto';

export class SubjectWithStudentsDto extends SubjectResponseDto {
  students: StudentResponseDto[];
}