import { ApiProperty } from "@nestjs/swagger";

export class CreateEnrollmentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  careerId: number;

  @ApiProperty({ required: false })
  enrollmentDate?: Date;

  @ApiProperty({ required: false })
  semester?: number;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  enrollmentType?: string;
}
