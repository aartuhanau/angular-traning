import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers/auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectUserState = createSelector(
  selectAuthState,
  (state) => state.userInfo,
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (userInfo) => !!userInfo.id,
);
