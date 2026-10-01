import { EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { authActions } from "../actions/auth.actions";
import { UserInfo } from "src/app/shared/models/user-info";

const USER_TOKEN_COOKIE_KEY = "userToken";
const USER_NAME_COOKIE_KEY = "userName";

export interface AuthState extends EntityState<UserInfo> {
  userInfo: UserInfo;
}

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  for (const part of document.cookie.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) {
      return decodeURIComponent(rest.join("="));
    }
  }

  return null;
}

function getInitialUserInfo(): UserInfo {
  return {
    id: getCookieValue(USER_TOKEN_COOKIE_KEY) ?? "",
    email: getCookieValue(USER_NAME_COOKIE_KEY) ?? "",
    password: "",
  };
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
