import { createFeatureSelector } from "@ngrx/store";
import { UserInfo } from "../shared/models/user-info";

export const selectUserState = createFeatureSelector<UserInfo>("auth");
