import { Test, TestingModule } from '@nestjs/testing';
import { CourseRecordController } from './course-record.controller';
import { CourseRecordService } from './course-record.service';

describe('CourseRecordController', () => {
  let controller: CourseRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseRecordController],
      providers: [CourseRecordService],
    }).compile();

    controller = module.get<CourseRecordController>(CourseRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
