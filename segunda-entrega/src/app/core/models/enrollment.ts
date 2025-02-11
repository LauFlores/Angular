export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  isActive: boolean;
  enrollmentDate: Date;
  updatedAt: Date;
}
