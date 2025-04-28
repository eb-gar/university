import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('registrations') //registros
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  create(@Body() data: any) {
    return this.registrationService.create(data);
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.registrationService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.registrationService.remove(+id);
  }
}
