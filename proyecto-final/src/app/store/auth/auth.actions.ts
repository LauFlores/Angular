import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user';

export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: User }>()
);

export const clearUser = createAction('[Auth] Clear User');
