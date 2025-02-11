import {Injectable} from '@angular/core';
import {Enrollment} from "../models/enrollment";
import {delay, Observable, of, throwError} from "rxjs";
import {rndTime, getNextId} from "../../shared/utils";

let ENROLLMENTS_DB: Enrollment[] = [
  {
    id: 1,
    studentId: 1,
    courseId: 1,
    isActive: true,
    enrollmentDate: new Date('2023-08-15'),
    updatedAt: new Date('2023-09-10')
  },
  {
    id: 2,
    studentId: 2,
    courseId: 1,
    isActive: true,
    enrollmentDate: new Date('2023-02-01'),
    updatedAt: new Date('2023-05-20')
  },
  {
    id: 3,
    studentId: 3,
    courseId: 2,
    isActive: true,
    enrollmentDate: new Date('2023-01-22'),
    updatedAt: new Date('2023-01-25'),
  },
  {
    id: 4,
    studentId: 4,
    courseId: 1,
    isActive: true,
    enrollmentDate: new Date('2023-01-28'),
    updatedAt: new Date('2023-01-30'),
  }
];

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor() {
  }

  getActiveEnrollments(): Observable<Enrollment[]> {
    ENROLLMENTS_DB = ENROLLMENTS_DB.filter(e => e.isActive);
    return of(ENROLLMENTS_DB).pipe(delay(rndTime()));
  }

  getEnrollmentsByStudentId(studentId: number): Observable<Enrollment[]> {
    const enrollments: Enrollment[] = ENROLLMENTS_DB.filter(e => e.studentId === studentId);
    return of(enrollments).pipe(delay(rndTime()));
  }

  getEnrollmentsByCourseId(courseId: number): Observable<Enrollment[]> {
    const enrollments: Enrollment[] = ENROLLMENTS_DB.filter(e => e.courseId === courseId);
    return of(enrollments).pipe(delay(rndTime()));
  }

  enrollStudent(enrollment: Omit<Enrollment, 'id' | 'isActive' | 'enrollmentDate' | 'updatedAt'>): Observable<Enrollment[]> {
    const existingEnrollment: Enrollment | undefined = ENROLLMENTS_DB.find(e => e.studentId === enrollment.studentId && e.courseId === enrollment.courseId);
    if (existingEnrollment) {
      return throwError(() => new Error('Alumno ya está inscrito en el curso'));
    }
    const newEnrollment: Enrollment = {
      id: getNextId(ENROLLMENTS_DB) + 1,
      courseId: enrollment.courseId,
      studentId: enrollment.studentId,
      isActive: true,
      enrollmentDate: new Date(),
      updatedAt: new Date()
    };
    ENROLLMENTS_DB = [...ENROLLMENTS_DB, newEnrollment];
    console.table(newEnrollment);
    console.table(ENROLLMENTS_DB);
    return of(ENROLLMENTS_DB).pipe(delay(rndTime(.7)));
  }

  unenrollStudent(studentId: number, courseId: number): Observable<Enrollment[]> {
    const activeEnrollment: Enrollment | undefined = ENROLLMENTS_DB.find(e => e.studentId === studentId && e.courseId === courseId && e.isActive);
    if (activeEnrollment) {
      activeEnrollment.isActive = false;
      activeEnrollment.updatedAt = new Date();
      ENROLLMENTS_DB = ENROLLMENTS_DB.map(e =>
        e.id === activeEnrollment.id
          ? {...activeEnrollment, isActive: false, updatedAt: new Date()}
          : e
      )
      return of(ENROLLMENTS_DB).pipe(delay(rndTime(.5)));
    } else {
      return throwError(() => new Error('Alumno no está inscrito en el curso'));
    }
  }
}

