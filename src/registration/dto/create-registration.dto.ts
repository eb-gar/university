import { ApiProperty } from "@nestjs/swagger";

export class CreateRegistrationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  subjectId: number;

  @ApiProperty({ required: false })
  academicTerm?: string;

  @ApiProperty({ required: false })
  registrationDate?: Date;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  grade?: number;

  @ApiProperty({ required: false })
  groupCode?: string;

  @ApiProperty({ required: false })
  teacherId?: number;
}
