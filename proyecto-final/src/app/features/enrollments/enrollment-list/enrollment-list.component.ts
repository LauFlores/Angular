import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Enrollment } from '../../../core/models/enrollment';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enrollment-list',
  // template: `<h1>Lista de Inscriptos</h1>`,
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss', '../../../shared/styles/lists.scss'],
  // styleUrls: ['./enrollment-list.component.scss'],
  standalone: false

})
export class EnrollmentListComponent 


implements OnInit, AfterViewInit {
  // Columnas a mostrar en la tabla
  displayedColumns: string[] = ['studentId', 'courseId', 'enrollmentDate', 'enrolledBy'];
  
  isLoading: boolean = false;
  // Lista de inscripciones
  enrollments: Enrollment[] = [];
  dataSource: MatTableDataSource<Enrollment> = new MatTableDataSource<Enrollment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private enrollmentService: EnrollmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método para cargar la lista de inscripciones desde el servicio
  private loadEnrollments(): void {
    this.isLoading = true;
    this.enrollmentService.getEnrollments().subscribe({
      next: (enrollments: Enrollment[]): void => {
        this.dataSource.data = enrollments;
        this.isLoading = false;
      },
      error: (err): void => {
        this.snackBar.open('Error al cargar las inscripciones', 'Cerrar', { duration: 3000 });
        console.error('Error al cargar las inscripciones:', err);
        this.isLoading = false;
      }
    });
  }

  // Método para aplicar filtro en la tabla (búsqueda)
  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // // Método para eliminar una inscripción
  // deleteEnrollment(enrollmentId: number): void {
  //   const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta inscripción?');
  //   if (!confirmDelete) return;

  //   this.isLoading = true;
  //   this.enrollmentService.deleteEnrollment(enrollmentId).subscribe({
  //     next: (): void => {
  //       this.snackBar.open('Inscripción eliminada correctamente', 'Cerrar', { duration: 3000 });
  //       this.loadEnrollments(); // Recarga la lista después de eliminar
  //     },
  //     error: (err): void => {
  //       this.snackBar.open('Error al eliminar la inscripción', 'Cerrar', { duration: 3000 });
  //       console.error('Error al eliminar la inscripción:', err);
  //       this.isLoading = false;
  //     }
  //   });
  // }

  // Opcional: Método para ver detalles o modificar una inscripción (según requerimientos)
  openDetail(row: Enrollment): void {
    // Aquí se implementaría la lógica para abrir un diálogo o navegar a otra vista con el detalle
    console.log('Detalle de inscripción:', row);
  }

  openDialog(row: Enrollment | null): void {
    // Aquí se implementaría la lógica para abrir un diálogo de edición o creación de inscripción
    console.log('Abrir diálogo para', row ? 'editar' : 'crear', 'inscripción');
  }
}
