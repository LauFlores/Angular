// import { createReducer, on } from '@ngrx/store';
// import { User } from '../../../core/models/user';
// import {
//   loadUsers, loadUsersSuccess, loadUsersFailure,
//   loadUserById, loadUserByIdSuccess, loadUserByIdFailure,
//   updateUser, updateUserSuccess, updateUserFailure,
//   deleteUserById, deleteUserSuccess, deleteUserFailure
// } from './user.actions';

// // Estado inicial
// export interface UserState {
//   users: User[];
//   selectedUser: User | null;
//   loading: boolean;
//   error: string | null;
// }

// export const initialUserState: UserState = {
//   users: [],
//   selectedUser: null,
//   loading: false,
//   error: null
// };

// // Reducer de User
// export const userReducer = createReducer(
//   initialUserState,

//   // Cargar usuarios
//   on(loadUsers, state => ({ ...state, loading: true })),
//   on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
//   on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),

//   // Obtener usuario por ID
//   on(loadUserByIdSuccess, (state, { user }) => ({ ...state, selectedUser: user, loading: false })),
//   on(loadUserByIdFailure, (state, { error }) => ({ ...state, error, loading: false })),

//   // Actualizar usuario
//   on(updateUserSuccess, (state, { user }) => ({
//     ...state,
//     users: state.users.map(u => (u.id === user.id ? user : u)),
//     loading: false
//   })),
//   on(updateUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

//   // Eliminar usuario
//   on(deleteUserSuccess, (state, { id }) => ({
//     ...state,
//     users: state.users.filter(user => user.id !== id),
//     loading: false
//   })),
//   on(deleteUserFailure, (state, { error }) => ({ ...state, error, loading: false }))
// );
