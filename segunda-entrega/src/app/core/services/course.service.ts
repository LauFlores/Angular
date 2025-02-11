import { Injectable } from '@angular/core';
import {Course} from "../models/course";
import {delay, Observable, of, throwError} from "rxjs";
import {getNextId, rndTime} from "../../shared/utils";

let COURSES_DB: Course[] = [
  {
    id: 1,
    name: 'Angular',
    description: 'Desarrollo de aplicaciones web con Angular.',
    isActive: true,
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-09-10')
  },
  {
    id: 2,
    name: 'React',
    description: 'Desarrollo de interfaces de usuario con React.',
    isActive: true,
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-05-20')
  },
  {
    id: 3,
    name: 'JavaScript',
    description: 'Fundamentos de Javascript.',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-07-25')
  },
  {
    id: 4,
    name: 'Spring',
    description: 'Desarrollo de aplicaciones con Spring Framework.',
    isActive: true,
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-06-08')
  },
  {
    id: 5,
    name: 'Laravel',
    description: 'Desarrollo de aplicaciones con Laravel.',
    isActive: true,
    createdAt: new Date('2023-03-21'),
    updatedAt: new Date('2023-07-03')
  },
]

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  getActiveCourses(): Observable<Course[]> {
    COURSES_DB = COURSES_DB.filter(c => c.isActive);
    return of(COURSES_DB).pipe(delay(rndTime()));
  }

  getInactiveCourses(): Observable<Course[]> {
    COURSES_DB = COURSES_DB.filter(c => !c.isActive);
    return of(COURSES_DB).pipe(delay(rndTime()));
  }

  getCourseById(id: number): Observable<Course> {
    const course: Course | undefined = COURSES_DB.find(c => c.id === id);
    if (course) {
      return of(course).pipe(delay(rndTime()));
    } else {
      return  throwError(() => new Error('Curso no encontrado'));
    }
  }

  addCourse(result: Course): Observable<Course[]> {
    const newCourse: Course = {
      ...result,
      isActive: true,
      id: getNextId(COURSES_DB),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    COURSES_DB = [...COURSES_DB, newCourse];
    return of(COURSES_DB).pipe(delay(rndTime(.7)));
  }

  deleteCourse(id: number): Observable<Course[]> {
    COURSES_DB = COURSES_DB.map(c =>
      c.id === id ? {...c, isActive: false, updatedAt: new Date()} : c
    ).filter(c => c.isActive);
    return of(COURSES_DB).pipe(delay(rndTime(.3)));
  }

  updateCourse(id: number, result: Partial<Course>): Observable<Course[]> {
    COURSES_DB = COURSES_DB.map(c =>
      c.id === id ? {...c, ...result, updatedAt: new Date()} : c
    ).filter(c => c.isActive);
    return of(COURSES_DB).pipe(delay(rndTime(.5)));
  }

  activateCourse(id: number): Observable<Course[]> {
    COURSES_DB = COURSES_DB.map(c =>
      c.id === id ? {...c, isActive: true, updatedAt: new Date()} : c
    ).filter(c => !c.isActive);
    return of(COURSES_DB).pipe(delay(rndTime(.5)));
  }
}
