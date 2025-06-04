import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_registrations'],
  })
  create(@Body() data: CreateRegistrationDto) {
    return this.registrationService.create(data);
  }

  @Get()
  @Auth({
    roles: ['ADMIN', 'TEACHER'],
    permissions: ['view_registrations'],
  })
  findAll() {
    return this.registrationService.findAll();
  }

  @Patch(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['manage_registrations'],
  })
  update(@Param('id') id: string, @Body() data: UpdateRegistrationDto) {
    return this.registrationService.update(+id, data);
  }

  @Delete(':id')
  @Auth({
    roles: ['ADMIN'],
    permissions: ['delete_registrations'],
  })
  delete(@Param('id') id: string) {
    return this.registrationService.remove(+id);
  }
}
