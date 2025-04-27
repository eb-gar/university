import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  gender?: string;

  @ApiProperty({ required: false })
  semester?: number;
}
