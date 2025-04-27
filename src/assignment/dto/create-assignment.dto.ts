import { ApiProperty } from "@nestjs/swagger";

export class CreateAssignmentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  teacherId: number;

  @ApiProperty()
  subjectId: number;

  @ApiProperty({ required: false })
  academicTerm?: string;

  @ApiProperty({ required: false })
  groupCode?: string;

  @ApiProperty({ required: false })
  schedule?: string;

  @ApiProperty({ required: false })
  classroom?: string;

  @ApiProperty({ required: false })
  status?: string;
}
