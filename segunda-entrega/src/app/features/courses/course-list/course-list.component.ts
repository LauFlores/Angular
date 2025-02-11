import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Course} from "../../../core/models/course";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CourseService} from "../../../core/services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {CourseFormComponent} from "../course-form/course-form.component";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss', '../../../shared/styles/lists.scss']
})
export class CourseListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();
  isLoading: boolean = false;
  showInactive: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private coursesService: CourseService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadCourses() {
    this.isLoading = true;
    if (this.showInactive) {
      this.coursesService.getInactiveCourses().subscribe(
        courses => {
          this.dataSource.data = courses;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        });
    } else {
      this.coursesService.getActiveCourses().subscribe(
        courses => {
          this.dataSource.data = courses;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
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

  openDialog(c: Course | null): void {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      data: c || null,
      width: '500px',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (!!result) {
          if (c) {
            this.updateCourse(c.id, result);
          } else {
            this.addCourse(result);
          }
        }
      }
    });
  }

  updateCourse(id: number, result: any): void {
    this.isLoading = true;
    this.coursesService.updateCourse(id, result).subscribe({
      next: (dataCourses) => {
        this.dataSource.data = dataCourses;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  addCourse(result: Course): void {
    this.isLoading = true;
    this.coursesService.addCourse(result).subscribe({
      next: (dataCourses) => {
        this.dataSource.data = dataCourses;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  deleteCourse(row: { id: number; }) {
    this.isLoading = true;
    this.coursesService.deleteCourse(row.id).subscribe({
      next: (dataCourses) => {
        this.dataSource.data = dataCourses;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  toggleInactive($event: MatSlideToggleChange) {
    this.showInactive = $event.checked;
    this.loadCourses();
  }
}
