import { inject, Injectable } from "@angular/core";
import { UserInfo } from "../../shared/models/user-info";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AuthServiceAdapter } from "./auth-service-adapter";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private USER_TOKEN = "userToken";
  private USER_NAME = "userName";
  private authServiceAdapter: AuthServiceAdapter = inject(AuthServiceAdapter);
  serverErrorObject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  createUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.authServiceAdapter.createUser(userInfo).pipe(
      tap((userInfo) => {
        if (userInfo?.id !== undefined) {
          localStorage.setItem(this.USER_TOKEN, userInfo?.id);
          localStorage.setItem(this.USER_NAME, userInfo.email);
        }
      }),
    );
  }

  authUser(userInfo: UserInfo): Observable<UserInfo[]> {
    return this.authServiceAdapter.authenticateUser(userInfo).pipe(
      tap((userInfo) => {
        if (userInfo.length == 1 && userInfo[0].id) {
          localStorage.setItem(this.USER_TOKEN, userInfo[0].id);
          localStorage.setItem(this.USER_NAME, userInfo[0].email);
        }
      }),
    );
  }

  isAuthenticated(): boolean {
    return typeof localStorage.getItem(this.USER_TOKEN) === "string";
  }

  getUserName(): boolean {
    return typeof localStorage.getItem(this.USER_NAME) === "string";
  }

  logoutUser(): void {
    localStorage.removeItem(this.USER_TOKEN);
    localStorage.removeItem(this.USER_NAME);
  }

  updateAuthenticationMessage(message : string | null ){
    this.serverErrorObject.next(message)
  }

  getAuthenticationMessage(): Observable<string | null>{
    return this.serverErrorObject.asObservable()
  }
}
