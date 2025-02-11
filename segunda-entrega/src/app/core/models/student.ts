import {Enrollment} from "./enrollment";

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  enrollments?: Enrollment[];
}

