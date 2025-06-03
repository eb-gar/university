export class CreateAssignmentDto {
  teacherId: number;
  subjectId: number;
  academicTerm?: string;
  groupCode?: string;
  schedule?: string;
  classroom?: string;
  status?: string;
}
