export class CreateCourseRecordDto {
  careerId: number;
  subjectId: number;
  recordDate?: Date;
  suggestedSemester?: number;
  status?: string;
}