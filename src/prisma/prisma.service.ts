import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  career: any;
  enrollment: any;
  subject: any;
  assignment: any;
  courseRecord: any;
  registration: any;
  student: any;
  teacher: any;
  constructor() {
    super();
  }
}
