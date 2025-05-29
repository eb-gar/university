import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('registrations') //registros
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Auth(ValidRoles.admin, ValidRoles.student) 
  @Post()
  create(@Body() data: any) {
    return this.registrationService.create(data);
  }

  @Auth(ValidRoles.admin, ValidRoles.student)
  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.registrationService.update(+id, data);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.registrationService.remove(+id);
  }
}
