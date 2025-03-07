import {Enrollment} from "./enrollment";

export interface Course {
  id: string;
  name: string;
  description: string;
  imageURL?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  enrollments?: Enrollment[];
  teacher?: string;
  hours: number;    
  classes: number;
}
