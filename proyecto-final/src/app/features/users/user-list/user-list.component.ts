import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {User} from "../../../core/models/user";
import {UserService} from "../../../core/services/user.service";
import {AuthService} from "../../../core/services/auth.service";

import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";





@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss', '../../../shared/styles/lists.scss'],
    standalone: false
})
export class UserListComponent implements OnInit, AfterViewInit {
   displayedColumns: string[] = [
      'apellido',
      'nombre',
      'email',
      'password',
      'direccion',
      'tel',
      'updatedAt',
      'role',
      'actions'
   ];
   isLoading: boolean = false;
   users: User[] = [];
   dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

   currentUserId: string | null = null;

   constructor(
      private userService: UserService,
      private authService: AuthService,
      private snackBar: MatSnackBar
   ) {
   }

   ngOnInit(): void {
      const currentUser: User | null = this.authService.getCurrentUser();
      this.currentUserId = currentUser?.id || null;
      this.loadUsers();
   }

   ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   }

   private loadUsers() {
      this.isLoading = true;
      this.userService.getUsers().subscribe({
         next: (users: User[]): void => {
            this.dataSource.data = users;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoading = false;
         },
         error: (err): void => {
            this.snackBar.open('Error al cargar los usuarios', 'Cerrar', {
               duration: 3000,
            });
            console.error('Error al cargar los usuarios:', err);
            this.isLoading = false;
         },
      });
   }

   applyFilter(event: Event): void {
      const filterValue: string = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   toggleRole(row: { id: string; }): void {
      if (this.currentUserId === row.id) {
         this.snackBar.open('No se puede cambiar el rol de su propio usuario', 'Cerrar', {
            duration: 3000,
         });
         return;
      }
      this.isLoading = true;
      this.userService.toggleAdmin(row.id).subscribe({
         next: (user: User): void => {
            this.snackBar.open(`Rol de ${user.firstName} ${user.lastName} cambiado a ${user.role}`, 'Cerrar', {
               duration: 3000,
            });
            this.loadUsers();
         },
         error: (err): void => {
            this.snackBar.open('Error al cambiar el rol del usuario', 'Cerrar', {
               duration: 3000,
            });
            this.isLoading = false;
         },
      });
   }

   editUser(user: User): void {
      const newFirstName = prompt('Ingrese el nuevo nombre:', user.firstName);
      const newLastName = prompt('Ingrese el nuevo apellido:', user.lastName);
      const newEmail = prompt('Ingrese el nuevo email:', user.email);
      const newPassword = prompt('Ingrese el nuevo email:', user.password);
      const newDireccion = prompt('Ingrese el nuevo email:', user.direccion);
      const newTel = prompt('Ingrese el nuevo email:', user.tel);
   
      
      if (newFirstName && newLastName && newEmail && newPassword && newDireccion && newTel) {
         const updatedUser: Partial<User> = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            password: newPassword,
            direccion: newDireccion,
            tel: newTel
         };
   
         this.userService.updateUser(user.id, updatedUser).subscribe({
            next: () => {
               this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', { duration: 3000 });
               this.loadUsers(); // Recarga la lista de usuarios
            },
            error: () => {
               this.snackBar.open('Error al actualizar el usuario', 'Cerrar', { duration: 3000 });
            }
         });
      }
   }
   

   deleteUser(userId: string): void {
      if (this.currentUserId === userId) {
         this.snackBar.open('No puedes eliminar tu propio usuario', 'Cerrar', {
            duration: 3000,
         });
         return;
      }
   
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
      if (!confirmDelete) return;
   
      this.isLoading = true;
      this.userService.deleteUser(userId).subscribe({
         next: () => {
            this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
               duration: 3000,
            });
            this.loadUsers(); // Recargar la lista
         },
         error: (err) => {
            this.snackBar.open('Error al eliminar el usuario', 'Cerrar', {
               duration: 3000,
            });
            console.error('Error al eliminar usuario:', err);
            this.isLoading = false;
         }
      });
   }
   

}
