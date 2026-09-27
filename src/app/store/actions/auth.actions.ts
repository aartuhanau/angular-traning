import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserInfo } from "src/app/shared/models/user-info";

export const authActions = createActionGroup({
  source: "Auth API",
  events: {
    authUser: props<{ userInfo: UserInfo }>(),
    authUserSuccess: props<{ userInfo: UserInfo }>(),
    authCreateUser: props<{ userInfo: UserInfo }>(),
    authUserFailure: props<{ error: string }>(),
    authLogoutUser: emptyProps(),
  },
});
