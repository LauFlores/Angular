import { Component } from '@angular/core';
import {Class} from "../../../core/models/class";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassService} from "../../../core/services/class.service";

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss', '../../../shared/styles/details.scss']
})
export class ClassDetailComponent {
  classID!: string;
  class!: Class;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    // Obtener el ID del curso desde la ruta.
    this.route.params.subscribe((params) => {
      this.classID = params['id'];
      this.loadClass();
    });
  }

  private loadClass(): void {
    this.isLoading = true;
    this.classesService.getClassById(this.classID).subscribe({
      next: (classItem) => {
        this.class = classItem;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    // Redireccionar al listado de cursos.
    this.router.navigate(['/classes']).then();
  }

  goToCourse() {
    // Redireccionar al curso.
    this.router.navigate(['/courses', this.class.courseId]).then();
  }
}
