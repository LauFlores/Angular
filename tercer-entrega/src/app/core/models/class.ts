export interface Class {
  id: string;
  title: string;
  description: string;
  courseId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  courseName?: string;
}
