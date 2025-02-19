export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  isActive: boolean;
  enrollmentDate: Date;
  updatedAt: Date;
}
