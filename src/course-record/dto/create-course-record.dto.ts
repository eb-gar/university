import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseRecordDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  careerId: number;

  @ApiProperty()
  subjectId: number;

  @ApiProperty({ required: false })
  recordDate?: Date;

  @ApiProperty({ required: false })
  suggestedSemester?: number;

  @ApiProperty({ required: false })
  status?: string;
}
