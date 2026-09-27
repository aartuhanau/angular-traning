import { EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { authActions } from "../actions/auth.actions";
import { UserInfo } from "src/app/shared/models/user-info";

export interface AuthState extends EntityState<UserInfo> {
  userInfo: UserInfo;
}

const USER_TOKEN_KEY = "userToken";
const USER_NAME_KEY = "userName";

function getInitialUserInfo(): UserInfo {
  const token = localStorage.getItem(USER_TOKEN_KEY) ?? "";
  const userName = localStorage.getItem(USER_NAME_KEY) ?? "";
  return { id: token, email: userName, password: "" };
}

const initialState: AuthState = {
  ids: [],
  entities: {},
  userInfo: getInitialUserInfo(),
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
