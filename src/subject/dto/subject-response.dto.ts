import { CareerResponseDto } from '../../career/dto/career-response.dto';

export class SubjectResponseDto {
  id: number;
  name: string;
  credits: number;
  description?: string;
  semester: number;
  career: CareerResponseDto;
  createdAt: Date;
  updatedAt: Date;
}