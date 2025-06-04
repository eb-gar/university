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

  @Post()
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_enrollments'],
  })
  create(@Body() data: CreateEnrollmentDto) {
    return this.enrollmentService.create(data);
  }

  @Get()
  @Auth({
    roles: ['ADMIN', 'TEACHER'],
    permissions: ['view_enrollments'],
  })
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Patch(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_enrollments'],
  })
  update(@Param('id') id: string, @Body() data: UpdateEnrollmentDto) {
    return this.enrollmentService.update(+id, data);
  }

  @Delete(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['delete_enrollments'],
  })
  delete(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}