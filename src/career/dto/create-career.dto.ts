import { ApiProperty } from "@nestjs/swagger";

export class CreateCareerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  faculty?: string;

  @ApiProperty({ required: false })
  level?: string;

  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ required: false })
  description?: string;
}
