import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRegistrationDto) {
    return this.prisma.registration.create({ data });
  }

  findAll() {
    return this.prisma.registration.findMany();
  }

  update(id: number, data: UpdateRegistrationDto) {
    return this.prisma.registration.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.registration.delete({
      where: { id },
    });
  }
}
