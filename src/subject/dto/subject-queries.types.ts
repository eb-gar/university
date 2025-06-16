export type SubjectWithTeachers = {
  id: number;
  name: string;
  teacher_count: number;
};

export type SubjectApprovalStats = {
  id: number;
  name: string;
  semester: number;
  career_name: string;
  total_students: number;
  approved_students: number;
  approval_rate: number;
};

export type SubjectCareerStats = {
  careerId: number;
  career_name: string;
  subject_count: number;
  total_students: number;
};