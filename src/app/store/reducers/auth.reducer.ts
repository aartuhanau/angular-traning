import { EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { authActions } from "../actions/auth.actions";
import { UserInfo } from "src/app/shared/models/user-info";

export interface AuthState extends EntityState<UserInfo> {
  userInfo: UserInfo;
}

const initialState: AuthState = {
  ids: [],
  entities: {},
  userInfo: { id: "", email: "", password: "" },
};

export const authReducer = createReducer(
  initialState,
  on(authActions.authUserSuccess, (state, action) => ({
    ...state,
    userInfo: action.userInfo,
  })),
  on(authActions.authLogoutUser, (state) => ({
    ...state,
    userInfo: { id: "", email: "", password: "" },
  })),
);
