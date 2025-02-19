import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params,} from "@angular/router";

import {Class} from '../../../core/models/class';
import {ClassFormComponent} from '../class-form/class-form.component';
import {ClassService} from '../../../core/services/class.service';

import {Course} from "../../../core/models/course";
import {CourseService} from "../../../core/services/course.service";

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
   selector: 'app-class-list',
   templateUrl: './class-list.component.html',
   styleUrls: ['./class-list.component.scss', '../../../shared/styles/lists.scss']
})
export class ClassListComponent implements OnInit, AfterViewInit {
   displayedColumns: string[] = ['title', 'description', 'courseName', 'updatedAt', 'actions'];
   dataSource: MatTableDataSource<Class> = new MatTableDataSource<Class>();
   isLoading: boolean = false;
   showInactive: boolean = false;
   courses: Course[] = [];

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   private courseID!: string;

   constructor(
      private route: ActivatedRoute,
      private classesService: ClassService,
      private courseService: CourseService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
   ) {
   }

   ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   ngOnInit(): void {
      this.route.params.subscribe((params: Params): void => {
         this.courseID = params['id'];
         this.loadCourses(this.courseID);     // <-- Me aseguro de obtener primero los Cursos.
      });
   }

   private loadCourses(id?: string): void {
      this.courseService.getActiveCourses().subscribe({
         next: (courses: Course[]): void => {
            this.courses = courses;
            this.loadClasses()    // <-- Al terminar de cargar los Cursos, cargo las Clases.
         },
         error: (err): void => {
            console.error(err);
         },
      });
   }

   private loadClasses(): void {
      this.isLoading = true;
      if (this.showInactive) {
         this.classesService.getInactiveClasses(this.courseID).subscribe({
            next: (classes: Class[]): void => {
               this.mapCoursesNames(classes);    // <-- Mapea los nombres de los cursos.
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;
               this.isLoading = false;
            },
            error: (err): void => {
               this.snackBar.open('Error al cargar las clases', 'Cerrar', {
                  duration: 3000,
               });
               console.error('Error al cargar las clases inactivas:', err);
               this.isLoading = false;
            },
         });
      } else {
         this.classesService.getActiveClasses(this.courseID).subscribe({
            next: (classes: Class[]): void => {
               this.mapCoursesNames(classes);    // <-- Mapea los nombres de los cursos.
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;
               this.isLoading = false;
            },
            error: (err): void => {
               this.snackBar.open('Error al cargar las clases', 'Cerrar', {
                  duration: 3000,
               });
               console.error('Error al cargar las clases activas:', err);
               this.isLoading = false;
            },
         });
      }
   }

   applyFilter(event: Event): void {
      const filterValue: string = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   openDialog(c: Class | null): void {
      const dialogRef = this.dialog.open(ClassFormComponent, {
         data: c || null,
         width: '500px',
         disableClose: false
      });
      dialogRef.afterClosed().subscribe({
         next: (result): void => {
            if (!!result) {
               if (c) {
                  this.updateClass(c.id, result);
                  this.snackBar.open('Clase actualizada', 'Cerrar', {
                     duration: 3000,
                  });
               } else {
                  this.createClass(result);
                  this.snackBar.open('Clase creada', 'Cerrar', {
                     duration: 3000,
                  });
               }
            }
         }
      });
   }

   updateClass(id: string, result: any): void {
      this.isLoading = true;
      this.classesService.updateClass(id, result).subscribe({
         next: (dataClasses: Class[]): void => {
            this.mapCoursesNames(dataClasses);    // <-- Mapea los nombres de los cursos
            this.loadCourses();
         },
         complete: (): void => {
            this.isLoading = false;
         }
      });
   }

   createClass(result: Class): void {
      this.isLoading = true;
      this.classesService.createClass(result).subscribe({
         next: (dataClasses: Class[]): void => {
            this.mapCoursesNames(dataClasses);
            this.loadCourses();
         },
         complete: (): void => {
            this.isLoading = false;
         }
      });
   }

   deleteClass(row: { id: string; }): void {
      this.isLoading = true;
      this.classesService.deleteClass(row.id).subscribe({
         next: (dataClasses: Class[]): void => {
            this.mapCoursesNames(dataClasses);
            this.loadCourses();
            this.snackBar.open('Clase eliminada', 'Cerrar', {
               duration: 3000,
            });
         },
         complete: (): void => {
            this.isLoading = false;
         }
      });
   }

   toggleInactive($event: MatSlideToggleChange): void {
      this.showInactive = $event.checked;
      this.loadCourses();
   }

   mapCoursesNames(classes: Class[]): void {
      const courseMap = new Map<string, string>();
      this.courses.forEach((course: Course): void => {
         courseMap.set(course.id, course.name);
      });
      this.dataSource.data = classes.map((classItem: Class): Class => {
         const courseId: string = classItem.courseId;
         const courseName: string = courseMap.get(courseId) || 'Sin Curso';
         return {
            ...classItem,
            courseName: courseName
         };
      });
   }

}

