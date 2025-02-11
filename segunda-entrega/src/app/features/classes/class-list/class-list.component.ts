import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute,} from "@angular/router";

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

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss', '../../../shared/styles/lists.scss']
})
export class ClassListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'courseName', 'actions'];
  dataSource: MatTableDataSource<Class> = new MatTableDataSource<Class>();
  isLoading: boolean = false;
  showInactive: boolean = false;
  courses: Course[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private courseID!: number;

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassService,
    private courseService: CourseService,
    private dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseID = +params['id'];
      this.loadCourses(this.courseID);     // <-- Me aseguro de obtener primero los Cursos.
    });
  }

  private loadCourses(id?: number) {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loadClasses()    // <-- Al terminar de cargar los Cursos, cargo las Clases.
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private loadClasses() {
    this.isLoading = true;
    if (this.showInactive) {
      this.classesService.getInactiveClasses(this.courseID).subscribe({
        next: (classes) => {
          this.mapCoursesNames(classes);    // <-- Mapea los nombres de los cursos.
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
    } else {
      this.classesService.getActiveClasses(this.courseID).subscribe({
        next: (classes) => {
          this.mapCoursesNames(classes);    // <-- Mapea los nombres de los cursos.
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
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
          } else {
            this.addClass(result);
          }
        }
      }
    });
  }

  updateClass(id: number, result: any): void {
    this.isLoading = true;
    this.classesService.updateClass(id, result).subscribe({
      next: (dataClasses) => {
        this.mapCoursesNames(dataClasses);    // <-- Mapea los nombres de los cursos
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  addClass(result: Class): void {
    this.isLoading = true;
    this.classesService.addClass(result).subscribe({
      next: (dataClasses) => {
        this.mapCoursesNames(dataClasses);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteClass(row: { id: number; }): void {
    this.isLoading = true;
    this.classesService.deleteClass(row.id).subscribe({
      next: (dataClasses) => {
        this.mapCoursesNames(dataClasses);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  toggleInactive($event: MatSlideToggleChange): void {
    this.showInactive = $event.checked;
    this.loadClasses();
  }

  mapCoursesNames(classes: Class[]): void {
    const courseMap = new Map<number, string>();
    this.courses.forEach(course => {
      courseMap.set(course.id, course.name);
    });
    this.dataSource.data = classes.map((classsItem): Class => ({
        ...classsItem,
        courseName: courseMap.get(classsItem.courseId) || 'Sin Curso'
      }
    ));
  }

}

