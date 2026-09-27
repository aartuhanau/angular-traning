import { inject, Injectable } from "@angular/core";
import { UserInfo } from "../../shared/models/user-info";
import { BehaviorSubject, map, Observable } from "rxjs";
import { AuthServiceAdapter } from "./auth-service-adapter";
import { selectIsAuthenticated } from "src/app/store/auth.state";
import { authActions } from "src/app/store/actions/auth.actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private store = inject(Store);
  private readonly userTokenKey = "userToken";
  private readonly userNameKey = "userName";
  private isAuthenticatedSignal = this.store.selectSignal(selectIsAuthenticated);
  private authServiceAdapter: AuthServiceAdapter = inject(AuthServiceAdapter);
  serverErrorObject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  createUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.authServiceAdapter.createUser(userInfo).pipe(
      map((userInfo) => {
        if (userInfo?.id !== undefined) {
          localStorage.setItem(this.userTokenKey, userInfo.id);
          localStorage.setItem(this.userNameKey, userInfo.email);
        }

        return userInfo;
      }),
    );
  }

  authUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.authServiceAdapter
      .authenticateUser(userInfo)
      .pipe(
        map((userInfo) => {
          if (userInfo[0]?.id !== undefined) {
            localStorage.setItem(this.userTokenKey, userInfo[0].id);
            localStorage.setItem(this.userNameKey, userInfo[0].email);
          }

          return userInfo[0];
        }),
      );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  logoutUser(): void {
    localStorage.removeItem(this.userTokenKey);
    localStorage.removeItem(this.userNameKey);
    this.store.dispatch(authActions.authLogoutUser());
  }

  updateAuthenticationMessage(message: string | null) {
    this.serverErrorObject.next(message);
  }

  getAuthenticationMessage(): Observable<string | null> {
    return this.serverErrorObject.asObservable();
  }
}
