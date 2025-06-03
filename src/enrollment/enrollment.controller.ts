import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Auth('ADMIN')
  @Post()
  create(@Body() data: CreateEnrollmentDto) {
    return this.enrollmentService.create(data);
  }

  @Auth('ADMIN', 'TEACHER')
  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Auth('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateEnrollmentDto) {
    return this.enrollmentService.update(+id, data);
  }

  @Auth('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
