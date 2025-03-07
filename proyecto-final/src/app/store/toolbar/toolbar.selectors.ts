import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ToolbarState } from './toolbar.reducer';

export const selectToolbarState = createFeatureSelector<ToolbarState>('toolbar');

export const selectPageTitle = createSelector(
  selectToolbarState,
  (state: ToolbarState) => state.pageTitle
);
