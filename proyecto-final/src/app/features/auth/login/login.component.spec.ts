import {LoginComponent} from "./login.component";
import {ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../../shared/shared.module";
import {ActivatedRoute, Router, convertToParamMap} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of, throwError} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {User} from "../../../core/models/user";


describe('LoginComponent', () => {
   let component: LoginComponent;
   let fixture: ComponentFixture<LoginComponent>;

   // Mocks y Espías
   let authServiceSpy: jasmine.SpyObj<AuthService>;
   let routerSpy: jasmine.SpyObj<Router>;
   let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
   let activatedRouteStub: Partial<ActivatedRoute>;

   beforeEach(async () => {
      // Crear espías para los servicios
      authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
      routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
      snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

      // Configurar el ActivatedRoute con parámetros simulados
      activatedRouteStub = {
         snapshot: {
            queryParamMap: convertToParamMap({returnUrl: '/dashboard'}),
            url: [],
            params: {},
            data: {},
            fragment: '',
            outlet: 'primary',
            component: null,
            routeConfig: null,
            root: {} as any,
            parent: null,
            firstChild: null,
            children: [],
            pathFromRoot: [],
            queryParams: {},
            paramMap: convertToParamMap({}),
            title: '',
         }
      };

      await TestBed.configureTestingModule({
         declarations: [LoginComponent],
         imports: [SharedModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
         providers: [
            {provide: AuthService, useValue: authServiceSpy},
            {provide: Router, useValue: routerSpy},
            {provide: ActivatedRoute, useValue: activatedRouteStub},
            {provide: MatSnackBar, useValue: snackBarSpy}
         ],
         schemas: [NO_ERRORS_SCHEMA] // Ignorar componentes hijos no relevantes
      }).compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges(); // Ejecuta ngOnInit
   });

   it('should be instantiated', () => {
      expect(component).toBeTruthy();
   });

   it('should have invalid form when empty', () => {
      expect(component.loginForm.valid).toBeFalse();
   });

   it('should have valid form when email and password are provided', () => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password123');
      expect(component.loginForm.valid).toBeTrue();
   });

   it('should call authService.login with correct parameters on form submit', fakeAsync(() => {
      const mockUser: User = {
         id: "dfgdf",
         firstName: "Test",
         lastName: "User",
         email: "test@example.com",
         password: "password123",
         token: "token123",
         isActive: true,
         role: "USER",
         createdAt: new Date(),
         updatedAt: new Date()
      };

      // Configurar el espía para retornar un observable con el usuario simulado
      authServiceSpy.login.and.returnValue(of(mockUser));

      // Establecer valores en el formulario
      component.loginForm.controls['email'].setValue(mockUser.email);
      component.loginForm.controls['password'].setValue(mockUser.password);

      // Llamar a onSubmit
      component.onSubmit();
      tick(); // Simular el paso del tiempo para completar la suscripción

      // Verificar que AuthService.login fue llamado con los parámetros correctos
      expect(authServiceSpy.login).toHaveBeenCalledWith(mockUser.email, mockUser.password);

      // Verificar que se abrió el snackBar con el mensaje de éxito
      expect(snackBarSpy.open).toHaveBeenCalledWith('Sesión iniciada con éxito', 'Cerrar', {
         duration: 3000,
      });

      // Verificar que se navegó a la URL de retorno
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
   }));

   it('should not call authService.login when form is invalid', () => {
      // Formulario vacío
      component.onSubmit();

      // AuthService.login no debería haber sido llamado
      expect(authServiceSpy.login).not.toHaveBeenCalled();

      // SnackBar no debería haber sido llamado
      expect(snackBarSpy.open).not.toHaveBeenCalled();

      // Router no debería haber sido llamado
      expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
   });

   it('should show error message when login returns null (invalid credentials)', fakeAsync(() => {
      // Configurar el espía para retornar un observable con null (credenciales incorrectas)
      authServiceSpy.login.and.returnValue(of(null));

      // Establecer valores en el formulario
      component.loginForm.controls['email'].setValue('invalid@example.com');
      component.loginForm.controls['password'].setValue('wrongpassword');

      // Llamar a onSubmit
      component.onSubmit();
      tick(); // Simular el paso del tiempo para completar la suscripción

      // Verificar que AuthService.login fue llamado con los parámetros correctos
      expect(authServiceSpy.login).toHaveBeenCalledWith('invalid@example.com', 'wrongpassword');

      // Verificar que se abrió el snackBar con el mensaje de error
      expect(snackBarSpy.open).toHaveBeenCalledWith('Credenciales incorrectas', 'Cerrar', {
         duration: 3000,
      });

      // Router no debería haber sido llamado
      expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
   }));

   it('should handle error when authService.login throws an error', fakeAsync(() => {
      const errorResponse = new Error('Network error');

      // Configurar el espía para retornar un observable que lanza un error
      authServiceSpy.login.and.returnValue(throwError(() => errorResponse));

      // Establecer valores en el formulario
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password123');

      // Llamar a onSubmit
      component.onSubmit();
      tick(); // Simular el paso del tiempo para completar la suscripción

      // Verificar que AuthService.login fue llamado con los parámetros correctos
      expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password123');

      // Verificar que se abrió el snackBar con el mensaje de error
      expect(snackBarSpy.open).toHaveBeenCalledWith('Error al iniciar sesión: ' + errorResponse.message, 'Cerrar', {
         duration: 3000,
      });

      // Router no debería haber sido llamado
      expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
   }));

   it('should set returnUrl from query params on init', () => {
      // Reconfigurar el ActivatedRoute para retornar un returnUrl diferente
      const newReturnUrl = '/custom-dashboard';
      const activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
      activatedRoute.snapshot.queryParamMap.get = jasmine.createSpy().and.callFake((key: string) => {
         if (key === 'returnUrl') return newReturnUrl;
         return null;
      });

      // Reinicializar el componente para que ngOnInit se ejecute nuevamente
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.returnUrl).toBe(newReturnUrl);
   });

   it('should toggle hidePassword property', () => {
      expect(component.hidePassword).toBeTrue(); // Valor inicial

      component.hidePassword = !component.hidePassword;
      expect(component.hidePassword).toBeFalse();

      component.hidePassword = !component.hidePassword;
      expect(component.hidePassword).toBeTrue();
   });
});
