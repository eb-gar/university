export class CareerResponseDto {
  id: number;
  name: string;
  faculty?: string;
  level?: string;
  duration?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}