import { inject, Injectable } from "@angular/core";
import { UserInfo } from "../../shared/models/user-info";
import { BehaviorSubject, map, Observable } from "rxjs";
import { AuthServiceAdapter } from "./auth-service-adapter";
import { selectIsAuthenticated } from "src/app/store/auth.state";
import { Store } from "@ngrx/store";
import { CookieService } from "./cookie-service";

const USER_TOKEN_COOKIE_KEY = "userToken";
const USER_NAME_COOKIE_KEY = "userName";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private store = inject(Store);
  private cookieService = inject(CookieService);
  private isAuthenticatedSignal = this.store.selectSignal(
    selectIsAuthenticated,
  );
  private authServiceAdapter: AuthServiceAdapter = inject(AuthServiceAdapter);
  serverErrorObject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  createUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.authServiceAdapter.createUser(userInfo);
  }

  authUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.authServiceAdapter.authenticateUser(userInfo).pipe(
      map((users) => {
        const authenticatedUser = users[0];

        if (authenticatedUser?.id !== undefined) {
          this.cookieService.set(USER_TOKEN_COOKIE_KEY, authenticatedUser.id);
          this.cookieService.set(USER_NAME_COOKIE_KEY, authenticatedUser.email);
        }

        return authenticatedUser;
      }),
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  logoutUser(): void {
    this.cookieService.delete(USER_TOKEN_COOKIE_KEY);
    this.cookieService.delete(USER_NAME_COOKIE_KEY);
    this.updateAuthenticationMessage(null);
  }

  updateAuthenticationMessage(message: string | null) {
    this.serverErrorObject.next(message);
  }

  getAuthenticationMessage(): Observable<string | null> {
    return this.serverErrorObject.asObservable();
  }
}
