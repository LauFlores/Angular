import {Injectable} from '@angular/core';
import {Alumno} from "../shared/interfaces/alumno";
import {delay, Observable, of} from "rxjs";

let ALUMNOS_DB: Alumno[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Perez',
    email: 'juanperez@gmail.com',
    isActive: true
  },
  {
    id: 2,
    nombre: 'Maria',
    apellido: 'Gonzalez',
    email: 'mariagonzalez@gmail.com',
    isActive: true
  },
  {
    id: 3,
    nombre: 'Pedro',
    apellido: 'Aguilar',
    email: 'pedroaguilar@gmail.com',
    isActive: true
  },
  {
    id: 4,
    nombre: 'Luis',
    apellido: 'Gomez',
    email: 'luisgomez@gmail.com',
    isActive: true
  },
  {
    id: 5,
    nombre: 'Carlos',
    apellido: 'Perez',
    email: 'carlosperez@gmail.com',
    isActive: true
  },
  {
    id: 6,
    nombre: 'Ana',
    apellido: 'Ortiz',
    email: 'anaortiz@gmail.com',
    isActive: true
  },
  {
    id: 7,
    nombre: 'Rafael',
    apellido: 'Hernandez',
    email: 'rafaelhernandez@gmail.com',
    isActive: true
  },
  {
    id: 8,
    nombre: 'Sara',
    apellido: 'Rodriguez',
    email: 'sararodriguez@gmail.com',
    isActive: true
  },
];

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor() {
  }

  getAlumnos(): Observable<Alumno[]> {
    return new Observable<Alumno[]>((subscriber) => {
      setTimeout(() => {
        subscriber.next(ALUMNOS_DB);
        subscriber.complete();
      }, this.rndTime());
    });

    // return of(ALUMNOS_DB);
  }

  getActiveAlumnos(): Observable<Alumno[]> {
    ALUMNOS_DB = ALUMNOS_DB.filter(alumno => alumno.isActive);
    return of(ALUMNOS_DB).pipe(delay(this.rndTime()));
  }

  deleteAlumno(id: number): Observable<Alumno[]> {
    ALUMNOS_DB = ALUMNOS_DB.filter(alumno => alumno.id !== id);
    return of(ALUMNOS_DB).pipe(delay(this.rndTime() * .3));
  }

  updateAlumno(id: number, result: any) {
    ALUMNOS_DB = ALUMNOS_DB.map(alumno =>
      alumno.id === id ? {...alumno, ...result} : alumno
    );
    return of(ALUMNOS_DB).pipe(delay(this.rndTime() * .5));
  }

  addAlumno(result: Alumno) {
    ALUMNOS_DB = [...ALUMNOS_DB, { ...result, isActive: true, id: ALUMNOS_DB.length + 1 }];
    return of(ALUMNOS_DB).pipe(delay(this.rndTime() * .7));
  }

  private rndTime(): number {
    return Math.floor(Math.random() * 2000);
  }
}
