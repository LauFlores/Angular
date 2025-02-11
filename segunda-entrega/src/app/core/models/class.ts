export interface Class {
  id: number;
  title: string;
  description: string;
  courseId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  courseName?: string;
}
