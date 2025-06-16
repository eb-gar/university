import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CareerModule } from './career/career.module';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { RegistrationModule } from './registration/registration.module';
import { AssignmentModule } from './assignment/assignment.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CourseRecordModule } from './course-record/course-record.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CareerModule, SubjectModule, StudentModule, TeacherModule, EnrollmentModule, RegistrationModule, AssignmentModule, PrismaModule, CourseRecordModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

