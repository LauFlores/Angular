import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {AuthService} from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {User} from "../models/user";
import {MockProvider} from "ng-mocks";
import {NavigationExtras, Router} from "@angular/router";

const mockAuthData: User = {
   id: "dsfsf",
   firstName: "Laura",
   lastName: "Flores",
   email: "admin@mail.com",
   password: "1234",
   token: "sdjkfhdsjf",
   isActive: true,
   role: "ADMIN",
   createdAt: new Date(),
   updatedAt: new Date()

}

describe('AuthService', () => {

   let service: AuthService;
   let httpController: HttpTestingController;
   let router: Router;

   beforeEach(() => {
      // Configurar el MockProvider de Router
      TestBed.configureTestingModule({
         imports: [HttpClientTestingModule],
         providers: [AuthService,
            MockProvider(Router, {
               navigate: (commands: any[], extras?: NavigationExtras) => {
                  return new Promise(resolve => resolve(true));
               }
            })]
      })

      // Obtener los servicios
      service = TestBed.inject(AuthService);
      httpController = TestBed.inject(HttpTestingController);
      router = TestBed.inject(Router);
      localStorage.clear();
   });

   afterEach(() => {
      // Verificar que el HttpController se ha cerrado
      httpController.verify();
      localStorage.clear(); // Borrar el localStorage
   });

   // Testeo de la clase AuthService
   it('should be defined', () => {
      expect(service).toBeTruthy();
   });

   // Testeo de la funcionalidad de login
   it('should login', fakeAsync(() => {
      service.login(mockAuthData.email, mockAuthData.password).subscribe({
         // Verificar que se ha enviado el usuario correctamente
         next: (user) => {
            expect(user).toEqual(mockAuthData);
            // Verificar que el token se ha guardado en el localStorage
            expect(localStorage.getItem('token')).toEqual(mockAuthData.token);
         },
      });

      // Verificar que se ha llamado correctamente al servicio de usuarios
      const mockRequest = httpController.expectOne({
         url: `${environment.USERS_URL}?email=${mockAuthData.email}&password=${mockAuthData.password}`,
         method: 'GET',
      });
      expect(mockRequest.request.method).toBe('GET');
      mockRequest.flush([mockAuthData]);
      tick(); // Simular el paso del tiempo para completar la suscripción
   }));

   // Testeo de la funcionalidad de login con error
   it('should not login', fakeAsync(() => {
      service.login(mockAuthData.email, mockAuthData.password).subscribe({
         next: (user) => {
            // Verificar que el usuario es nulo
            expect(user).toBeNull();
         },
         error: (error) => {
            // Verificar que el error es el esperado
            expect(error.message).toBe('No se pudo iniciar sesión');

         },
      });

      // Verificar que se ha llamado correctamente al servicio de usuarios
      const mockRequest = httpController.expectOne({
         url: `${environment.USERS_URL}?email=${mockAuthData.email}&password=${mockAuthData.password}`,
         method: 'GET',
      });
      expect(mockRequest.request.method).toBe('GET');
      mockRequest.flush([], {status: 401, statusText: 'Unauthorized'});
      tick();
   }));

   // Testeo de la funcionalidad de logout
   it('should logout', fakeAsync(() => {
      // Configurar el spy de la función de navegación
      const spyOnNavigate = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

      service.login(mockAuthData.email, mockAuthData.password).subscribe();

      // Verificar que se ha llamado correctamente al servicio de usuarios
      const mockRequest = httpController.expectOne({
         url: `${environment.USERS_URL}?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      });
      mockRequest.flush([mockAuthData]);

      service.logout();
      tick();
      // Verificar que el token se ha borrado del localStorage
      expect(localStorage.getItem('token')).toBeNull();
      service.authUser$.subscribe({
         next: (user) => {
            expect(user).toBeNull();
         },
      });

      // Verificar que se ha llamado correctamente a la función de navegación
      expect(spyOnNavigate).toHaveBeenCalledWith(['/welcome']);
   }));

   // Testeo de la funcionalidad de registro de usuario
   it('should register a new user', fakeAsync(() => {
      service.register(mockAuthData).subscribe(user => {
         expect(user).toEqual(mockAuthData);
      });

      // Verificar que se ha llamado correctamente al servicio de usuarios
      const mockRequest = httpController.expectOne({
         url: `${environment.USERS_URL}`,
         method: 'POST'
      });

      // Verificar que se ha enviado el usuario correctamente
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(mockAuthData);

      mockRequest.flush(mockAuthData);
      tick();
   }));

   // Testeo de la funcionalidad de registro de usuario con error
   it('should handle error on register', fakeAsync(() => {
      service.register(mockAuthData).subscribe({
         next: () =>{
            fail('No se debería haber producido ningún error'); // No debería haber producido ningún error
         },
         error: (error) => {
            expect(error.message).toBe('No se pudo registrar el usuario'); // El error debería ser el esperado
         }
      });

      const mockRequest = httpController.expectOne({
         url: `${environment.USERS_URL}`,
         method: 'POST'
      });
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual(mockAuthData);
   }));

   it('should verify token', fakeAsync(() => {
      service.login(mockAuthData.email, mockAuthData.password).subscribe();

      const loginRequest = httpController.expectOne({
         url: `${environment.USERS_URL}?email=${mockAuthData.email}&password=${mockAuthData.password}`,
         method: 'GET'
      });
      expect(loginRequest.request.method).toBe('GET');
      loginRequest.flush([mockAuthData]);
      tick();

      service.verifyToken().subscribe({
         next: (isValid) => {
            expect(isValid).toBe(true);
         },
         error: (error) => {
            fail(error);
         }
      });

      const mockRequest = httpController.expectOne({
         url: `${environment.USERS_URL}?token=${mockAuthData.token}`,
         method: 'GET'
      });
      expect(mockRequest.request.method).toBe('GET');
      mockRequest.flush([mockAuthData]);
      tick();
   }));

   it('should handle error on verify token', fakeAsync(() => {
      const invalidToken = 'invalidToken';
      localStorage.setItem('token', invalidToken);

      service.verifyToken().subscribe({
         next: (isValid) => {
            expect(isValid).toBe(false);
         },
         error: (error) => {
            fail('Error al verificar token');
         },
      });


      const mockRequest = httpController.expectOne({
         url: `${environment.USERS_URL}?token=${invalidToken}`,
         method: 'GET'
      });

      expect(mockRequest.request.method).toBe('GET');
      mockRequest.flush([], {status: 401, statusText: 'Unauthorized'});
      tick();
   }));

   it ('should return false if no token is present', fakeAsync(() => {
      localStorage.removeItem('token');
      service.verifyToken().subscribe({
         next: (isValid) => {
            expect(isValid).toBe(false);
         },
         error: (error) => {
            fail('Error al verificar token');
         },
      });

      httpController.expectNone(`${environment.USERS_URL}?token=null`);
      tick();
   }));

});
