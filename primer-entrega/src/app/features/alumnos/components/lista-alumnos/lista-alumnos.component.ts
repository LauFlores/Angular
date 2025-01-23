import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Alumno} from "../../../../shared/interfaces/alumno";
import {AlumnosService} from "../../../../services/alumnos.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AbmAlumnosComponent} from "../abm-alumnos/abm-alumnos.component";
import {MatDialog} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatInputModule,
    MatTableModule,
    MatButton,
    MatIcon,
    MatIconButton,
    MatProgressSpinner,
  ],
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css'
})

export class ListaAlumnosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['apellido', 'nombre', 'email', 'actions'];
  dataSource = new MatTableDataSource<Alumno>;
  isLoading = false;
  user = {
    firstName: 'Juan',
    lastName: 'Flores',
    role: 'admin',
  }

  /*@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;*/

  // Constructor
  constructor(
    private alumnosService: AlumnosService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadAlumnos();
  }

  loadAlumnos(): void {
    this.isLoading = true;
    this.alumnosService.getActiveAlumnos().subscribe({
      next: (dataAlumnos) => {
        this.dataSource.data = dataAlumnos;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Función para abrir el diálogo de creación/edición de alumnos.
  openDialog(alumno: Alumno | null): void {
    const dialogRef = this.dialog.open(AbmAlumnosComponent, {
      data: alumno || null,
      width: '500px',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (!!result) {
          if (alumno) {
            this.updateAlumno(alumno.id, result);
          } else {
            this.addAlumno(result);
          }
        }
      }
    });
  }

  // Función que llama al servicio para baja lógica del alumno.
  deleteAlumno(row: { id: number; }) {
    this.isLoading = true;
    this.alumnosService.deleteAlumno(row.id).subscribe({
      next: (dataAlumnos) => {
        this.dataSource.data = dataAlumnos;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Función que llama al servicio para actualizar el alumno.
  private updateAlumno(id: number, result: any) {
    this.isLoading = true;
    this.alumnosService.updateAlumno(id, result).subscribe({
      next: (dataAlumnos) => {
        this.dataSource.data = dataAlumnos;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Función que llama al servicio para crear el alumno.
  private addAlumno(result: Alumno) {
    this.isLoading = true;
    this.alumnosService.addAlumno(result).subscribe({
      next: (dataAlumnos) => {
        this.dataSource.data = dataAlumnos;
      },
      complete: () => {
        this.isLoading = false;
      }
    });

  }
}
