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

  @Auth('ADMIN', 'STUDENT')
  @Post()
  create(@Body() data: CreateRegistrationDto) {
    return this.registrationService.create(data);
  }

  @Auth('ADMIN', 'STUDENT')
  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Auth('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateRegistrationDto) {
    return this.registrationService.update(+id, data);
  }

  @Auth('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.registrationService.remove(+id);
  }
}
