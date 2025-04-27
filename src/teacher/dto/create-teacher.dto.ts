import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  specialty?: string;

  @ApiProperty({ required: false })
  department?: string;

  @ApiProperty({ required: false })
  status?: string;
}
