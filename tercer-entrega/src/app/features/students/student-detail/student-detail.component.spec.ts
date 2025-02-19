import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { StudentDetailComponent } from './student-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../core/services/student.service';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { CourseService } from '../../../core/services/course.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Student } from '../../../core/models/student';
import { Course } from '../../../core/models/course';
import { Enrollment } from '../../../core/models/enrollment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FullNamePipe } from '../../../shared/pipes/full-name.pipe';

describe('StudentDetailComponent', () => {
   let component: StudentDetailComponent;
   let fixture: ComponentFixture<StudentDetailComponent>;

   // Mock services
   let mockActivatedRoute: any;
   let mockRouter: any;
   let mockStudentsService: jasmine.SpyObj<StudentsService>;
   let mockEnrollmentService: jasmine.SpyObj<EnrollmentService>;
   let mockCourseService: jasmine.SpyObj<CourseService>;
   let mockMatDialog: jasmine.SpyObj<MatDialog>;

   beforeEach(waitForAsync(() => {
      // spies para los servicios
      mockStudentsService = jasmine.createSpyObj('StudentsService', ['getStudentById']);
      mockEnrollmentService = jasmine.createSpyObj('EnrollmentService', ['getEnrollmentsByStudentId']);
      mockCourseService = jasmine.createSpyObj('CourseService', ['getActiveCourses']);
      mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

      // Mock ActivatedRoute
      mockActivatedRoute = {
         params: of({ id: '123' })
      };

      // Mock Router
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);

      TestBed.configureTestingModule({
         declarations: [StudentDetailComponent, FullNamePipe],
         imports: [
            RouterTestingModule,
            MatDialogModule,
            MatSnackBarModule
         ],
         providers: [
            { provide: ActivatedRoute, useValue: mockActivatedRoute },
            { provide: Router, useValue: mockRouter },
            { provide: StudentsService, useValue: mockStudentsService },
            { provide: EnrollmentService, useValue: mockEnrollmentService },
            { provide: CourseService, useValue: mockCourseService },
            { provide: MatDialog, useValue: mockMatDialog },
         ],
         schemas: [NO_ERRORS_SCHEMA] // Ignorar errores de componentes hijos
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StudentDetailComponent);
      component = fixture.componentInstance;
   });

   it('should create', () => {
      // Configurar el servicio para retornar un estudiante
      const mockStudent: Student = {
         id: '123',
         firstName: 'Lorena',
         lastName: 'Perez',
         email: 'lore.perez@mail.com',
         isActive: true,
         createdAt: new Date(),
         updatedAt: new Date(),
         enrollments: []
      };
      mockStudentsService.getStudentById.and.returnValue(of(mockStudent));

      // Configurar servicios de enrollments y courses
      mockEnrollmentService.getEnrollmentsByStudentId.and.returnValue(of([]));
      mockCourseService.getActiveCourses.and.returnValue(of([]));

      fixture.detectChanges(); // Ejecutar ngOnInit

      expect(component).toBeTruthy();
      expect(mockStudentsService.getStudentById).toHaveBeenCalledWith('123');
   });

   it('should handle error when loading student', fakeAsync(() => {
      // Simular un error al cargar el estudiante
      mockStudentsService.getStudentById.and.returnValue(throwError(() => new Error('Error loading student')));

      mockEnrollmentService.getEnrollmentsByStudentId.and.returnValue(of([]));
      mockCourseService.getActiveCourses.and.returnValue(of([]));

      spyOn(console, 'error');

      fixture.detectChanges(); // Ejecutar ngOnInit
      tick(); // Avanzar el tiempo

      expect(component.isLoading).toBeFalse();
      expect(console.error).toHaveBeenCalledWith(jasmine.any(Error));
   }));

   it('should load enrollments after view init', fakeAsync(() => {
      // Configurar el estudiante
      const mockStudent: Student = {
         id: '123',
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@example.com',
         isActive: true,
         createdAt: new Date(),
         updatedAt: new Date(),
         enrollments: []
      };
      mockStudentsService.getStudentById.and.returnValue(of(mockStudent));

      // Configurar enrollments y courses
      const mockEnrollments: Enrollment[] = [
         {
            id: 'e1',
            studentId: '123',
            courseId: 'c1',
            isActive: true,
            enrollmentDate: new Date(),
            updatedAt: new Date()
         },
         {
            id: 'e2',
            studentId: '123',
            courseId: 'c2',
            isActive: true,
            enrollmentDate: new Date(),
            updatedAt: new Date()
         }
      ];
      const mockCourses: Course[] = [
         {
            id: 'c1',
            name: 'Course 1',
            description: 'Description 1',
            imageURL: 'http://example.com/c1.png',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            enrollments: []
         },
         {
            id: 'c2',
            name: 'Course 2',
            description: 'Description 2',
            imageURL: 'http://example.com/c2.png',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            enrollments: []
         }
      ];
      mockEnrollmentService.getEnrollmentsByStudentId.and.returnValue(of(mockEnrollments));
      mockCourseService.getActiveCourses.and.returnValue(of(mockCourses));

      fixture.detectChanges(); // Ejecutar ngOnInit
      tick(); // Avanzar el tiempo

      expect(mockEnrollmentService.getEnrollmentsByStudentId).toHaveBeenCalledWith('123');
      expect(mockCourseService.getActiveCourses).toHaveBeenCalled();

      expect(component.enrollments.length).toBe(2);
      expect(component.enrollments[0].courseName).toBe('Course 1');
      expect(component.enrollments[1].courseName).toBe('Course 2');
   }));

   it('should handle error when loading enrollments', fakeAsync(() => {
      // Configurar el estudiante
      const mockStudent: Student = {
         id: '123',
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@example.com',
         isActive: true,
         createdAt: new Date(),
         updatedAt: new Date(),
         enrollments: []
      };
      mockStudentsService.getStudentById.and.returnValue(of(mockStudent));

      // Simular un error al cargar enrollments
      mockEnrollmentService.getEnrollmentsByStudentId.and.returnValue(throwError(() => new Error('Error loading enrollments')));

      spyOn(console, 'error');

      fixture.detectChanges(); // Ejecutar ngOnInit
      tick(); // Avanzar el tiempo

      expect(console.error).toHaveBeenCalledWith(jasmine.any(Error));
      expect(component.enrollments).toBeUndefined();
   }));

   it('should navigate back to students list when goBack is called', () => {
      component.goBack();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/students']);
   });

   it('should open enrollment form dialog and reload enrollments after closing', fakeAsync(() => {
      // Configurar el estudiante
      const mockStudent: Student = {
         id: '123',
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@example.com',
         isActive: true,
         createdAt: new Date(),
         updatedAt: new Date(),
         enrollments: []
      };
      mockStudentsService.getStudentById.and.returnValue(of(mockStudent));

      // Configurar enrollments y courses
      const mockEnrollments: Enrollment[] = [
         {
            id: 'e1',
            studentId: '123',
            courseId: 'c1',
            isActive: true,
            enrollmentDate: new Date(),
            updatedAt: new Date()
         }
      ];
      const mockCourses: Course[] = [
         {
            id: 'c1',
            name: 'Course 1',
            description: 'Description 1',
            imageURL: 'http://example.com/c1.png',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            enrollments: []
         }
      ];
      mockEnrollmentService.getEnrollmentsByStudentId.and.returnValue(of(mockEnrollments));
      mockCourseService.getActiveCourses.and.returnValue(of(mockCourses));

      // Configurar el diálogo para retornar un valor después de cerrarse
      const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true), close: null });
      mockMatDialog.open.and.returnValue(dialogRefSpyObj);

      fixture.detectChanges(); // Ejecutar ngOnInit
      tick(); // Avanzar el tiempo

      component.openEnrollmentForm();
      expect(mockMatDialog.open).toHaveBeenCalled();

      // Simular que el diálogo se cerró con éxito
      tick(); // Avanzar el tiempo para el afterClosed

      expect(mockEnrollmentService.getEnrollmentsByStudentId).toHaveBeenCalledTimes(2); // Una vez en ngAfterViewInit y otra después de cerrar el diálogo
   }));

   it('should not reload enrollments if dialog is closed without result', fakeAsync(() => {
      // Configurar el estudiante
      const mockStudent: Student = {
         id: '123',
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@example.com',
         isActive: true,
         createdAt: new Date(),
         updatedAt: new Date(),
         enrollments: []
      };
      mockStudentsService.getStudentById.and.returnValue(of(mockStudent));

      // Configurar enrollments y courses
      const mockEnrollments: Enrollment[] = [
         {
            id: 'e1',
            studentId: '123',
            courseId: 'c1',
            isActive: true,
            enrollmentDate: new Date(),
            updatedAt: new Date()
         }
      ];
      const mockCourses: Course[] = [
         {
            id: 'c1',
            name: 'Course 1',
            description: 'Description 1',
            imageURL: 'http://example.com/c1.png',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            enrollments: []
         }
      ];
      mockEnrollmentService.getEnrollmentsByStudentId.and.returnValue(of(mockEnrollments));
      mockCourseService.getActiveCourses.and.returnValue(of(mockCourses));

      // Configurar el diálogo para retornar undefined después de cerrarse
      const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(undefined), close: null });
      mockMatDialog.open.and.returnValue(dialogRefSpyObj);

      fixture.detectChanges(); // Ejecutar ngOnInit
      tick(); // Avanzar el tiempo

      component.openEnrollmentForm();
      expect(mockMatDialog.open).toHaveBeenCalled();

      // Simular que el diálogo se cerró sin resultado
      tick(); // Avanzar el tiempo para el afterClosed

      expect(mockEnrollmentService.getEnrollmentsByStudentId).toHaveBeenCalledTimes(1); // Solo la llamada inicial
   }));

});
