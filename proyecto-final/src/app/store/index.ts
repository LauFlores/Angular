import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { toolbarReducer, ToolbarState } from './toolbar/toolbar.reducer';

export interface RootState {
  auth: AuthState;
  toolbar: ToolbarState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  auth: authReducer,
  toolbar: toolbarReducer
};
