import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Student} from "../../../core/models/student";
import {StudentsService} from "../../../core/services/student.service";
import {StudentFormComponent} from "../student-form/student-form.component";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";


import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss', '../../../shared/styles/lists.scss']
})

export class StudentListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['apellido', 'nombre', 'email', 'updatedAt', 'actions'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>;
  isLoading: boolean = false;
  showInactive: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Constructor
  constructor(
    private studentsService: StudentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    if (this.showInactive) {
      this.studentsService.getInactiveStudents().subscribe(
        students => {
          this.dataSource.data = students;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        });
    } else {
      this.studentsService.getActiveStudents().subscribe(
        students => {
          this.dataSource.data = students;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        });
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

// Función para abrir el diálogo de creación/edición de students.
  openDialog(s: Student | null): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      data: s || null,
      width: '800px',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (!!result) {
          if (s) {
            this.updateAlumno(s.id, result);
            this.snackBar.open('Alumno actualizado', 'Cerrar', {
              duration: 3000,
            });
          } else {
            this.addAlumno(result);
            this.snackBar.open('Alumno creado', 'Cerrar', {
              duration: 3000,
            });
          }
        }
      }
    });
  }

// Función que llama al servicio para baja lógica del alumno.
  deleteStudent(row: { id: string; }) {
    this.isLoading = true;
    this.studentsService.deleteStudent(row.id).subscribe({
      next: (dataAlumnos) => {
        this.dataSource.data = dataAlumnos;
        this.loadStudents();
      },
      complete: () => {
        this.isLoading = false;
        this.snackBar.open('Alumno eliminado', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  activateStudent(row: { id: string; }) {
     this.isLoading = true;
     this.studentsService.activateStudent(row.id).subscribe({
        next: (dataAlumnos) => {
           this.dataSource.data = dataAlumnos;
           this.loadStudents();
        },
        complete: () => {
           this.isLoading = false;
           this.snackBar.open('Alumno activado', 'Cerrar', {
              duration: 3000,
           });
        }
     });
  }

// Función que llama al servicio para actualizar el alumno.
  private updateAlumno(id: string, result: any): void {
    this.isLoading = true;
    this.studentsService.updateStudent(id, result).subscribe({
      next: (dataAlumnos) => {
        this.dataSource.data = dataAlumnos;
        this.loadStudents();
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

// Función que llama al servicio para crear el alumno.
  private addAlumno(result: Student): void {
    this.isLoading = true;
    this.studentsService.createStudent(result).subscribe({
      next: (dataAlumnos) => {
        this.dataSource.data = dataAlumnos;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  toggleInactive($event: MatSlideToggleChange) {
    this.showInactive = $event.checked;
    this.loadStudents();
  }

  openConfirmationDialog(
     row: {id: string},
     dialogTitle: string,
     dialogMessage: string,
     onConfirm: () => void
  ): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: dialogTitle, message: dialogMessage },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        onConfirm();
      }
    });
  }

  confirmDeletion(row: { id: string; }) {
     this.openConfirmationDialog(
        row,
        'Eliminar alumno',
        '¿Está seguro de que desea eliminar alumno?',
        () => this.deleteStudent(row)
     );
  }

   confirmActivation(row: { id: string; }) {
      this.openConfirmationDialog(
         row,
         'Reactivar alumno',
         '¿Está seguro de que desea activar alumno?',
         () => this.activateStudent(row)
      );

   }
}
