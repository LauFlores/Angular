import {Injectable} from '@angular/core';
import {delay, Observable, of, throwError} from "rxjs";
import {Student} from "../models/student";
import {getNextId, rndTime} from "../../shared/utils";

let STUDENTS_DB: Student[] = [
  {
    id: 1,
    firstName: 'Martín',
    lastName: 'González',
    email: 'martin.gonzalez@example.com',
    isActive: true,
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2023-09-10')
  },
  {
    id: 2,
    firstName: 'Sofía',
    lastName: 'Rodríguez',
    email: 'sofia.rodriguez@example.com',
    isActive: false,
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-05-20')
  },
  {
    id: 3,
    firstName: 'Camila',
    lastName: 'Pérez',
    email: 'camila.perez@example.com',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-07-25')
  },
  {
    id: 4,
    firstName: 'Lucas',
    lastName: 'Fernández',
    email: 'lucas.fernandez@example.com',
    isActive: true,
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-06-08')
  },
  {
    id: 5,
    firstName: 'Valentina',
    lastName: 'López',
    email: 'valentina.lopez@example.com',
    isActive: false,
    createdAt: new Date('2023-03-21'),
    updatedAt: new Date('2023-07-03')
  },
  {
    id: 6,
    firstName: 'Joaquín',
    lastName: 'Martínez',
    email: 'joaquin.martinez@example.com',
    isActive: true,
    createdAt: new Date('2023-05-05'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: 7,
    firstName: 'Lucía',
    lastName: 'Sánchez',
    email: 'lucia.sanchez@example.com',
    isActive: false,
    createdAt: new Date('2023-07-22'),
    updatedAt: new Date('2023-09-05')
  },
  {
    id: 8,
    firstName: 'Emilio',
    lastName: 'Ruiz',
    email: 'emilio.ruiz@example.com',
    isActive: true,
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-08-11')
  },
  {
    id: 9,
    firstName: 'Carolina',
    lastName: 'Torres',
    email: 'carolina.torres@example.com',
    isActive: true,
    createdAt: new Date('2023-01-30'),
    updatedAt: new Date('2023-07-01')
  },
  {
    id: 10,
    firstName: 'Matías',
    lastName: 'Ramírez',
    email: 'matias.ramirez@example.com',
    isActive: false,
    createdAt: new Date('2023-03-14'),
    updatedAt: new Date('2023-05-30')
  }
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() {
  }

  getStudents(): Observable<Student[]> {
    return of(STUDENTS_DB).pipe(delay(rndTime()));
  }

  getActiveStudents(): Observable<Student[]> {
    STUDENTS_DB = STUDENTS_DB.filter(s => s.isActive);
    return of(STUDENTS_DB).pipe(delay(rndTime()));
  }

  deleteStudent(id: number): Observable<Student[]> {
    STUDENTS_DB = STUDENTS_DB.map(s =>
      s.id === id ? {...s, isActive: false, updatedAt: new Date()} : s
    ).filter(s => s.isActive);
    return of(STUDENTS_DB).pipe(delay(rndTime(.3)));
  }

  updateStudent(id: number, result: Partial<Student>): Observable<Student[]> {
    STUDENTS_DB = STUDENTS_DB.map(s =>
      s.id === id ? {...s, ...result, updatedAt: new Date()} : s
    ).filter(s => s.isActive);
    return of(STUDENTS_DB).pipe(delay(rndTime(.5)));
  }

  addStudent(result: Student): Observable<Student[]> {
    const newStudent: Student = {
      ...result,
      isActive: true,
      id: getNextId(STUDENTS_DB),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    STUDENTS_DB = [...STUDENTS_DB, newStudent];
    return of(STUDENTS_DB).pipe(delay(rndTime(.7)));
  }

  activateStudent(id: number): Observable<Student[]> {
    STUDENTS_DB = STUDENTS_DB.map(s =>
      s.id === id ? {...s, isActive: true, updatedAt: new Date()} : s
    ).filter(s => !s.isActive);
    return of(STUDENTS_DB).pipe(delay(rndTime(.5)));
  }

  getInactiveStudents(): Observable<Student[]> {
    STUDENTS_DB = STUDENTS_DB.filter(s => !s.isActive);
    return of(STUDENTS_DB).pipe(delay(rndTime()));
  }

  getStudentById(id: number): Observable<Student> {
    const student: Student | undefined = STUDENTS_DB.find(s => s.id === id);
    if (student) {
      return of(student).pipe(delay(rndTime()));
    } else {
      return  throwError(() => new Error('Alumno no encontrado'));
    }

  }
}
