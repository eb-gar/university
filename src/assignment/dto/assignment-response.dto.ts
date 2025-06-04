import { Subject } from '../../subject/entities/subject.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';

export class AssignmentResponseDto {
  id: number;
  academicTerm: string;
  groupCode: string;
  schedule: string;
  classroom: string;
  status: string;
  subject: Subject;
  teacher: Teacher;
  createdAt: Date;
  updatedAt: Date;
}