import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  credits: number;

  @IsInt()
  @IsNotEmpty()
  semester: number;

  @IsInt()
  @IsNotEmpty()
  careerId: number;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;
}