import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  credits: number;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  semester: number;

  @ApiProperty()
  careerId: number;
}
