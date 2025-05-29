import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('enrollments') //matrículas
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() data: any) {
    return this.enrollmentService.create(data);
  }

  @Auth(ValidRoles.admin, ValidRoles.teacher)
  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.enrollmentService.update(+id, data);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
