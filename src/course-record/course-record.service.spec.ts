import { Test, TestingModule } from '@nestjs/testing';
import { CourseRecordService } from './course-record.service';

describe('CourseRecordService', () => {
  let service: CourseRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseRecordService],
    }).compile();

    service = module.get<CourseRecordService>(CourseRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
