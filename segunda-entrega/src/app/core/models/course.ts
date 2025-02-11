import {Enrollment} from "./enrollment";

export interface Course {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  enrollments?: Enrollment[];
}
