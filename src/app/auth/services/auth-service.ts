import { inject, Injectable } from "@angular/core";
import { UserInfo } from "../../shared/models/user-info";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { AuthServiceAdapter } from "./auth-service-adapter";
import { selectUserState } from "src/app/store/auth.state";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private store = inject(Store);
  private userInfo = this.store.selectSignal(selectUserState);
  private authServiceAdapter: AuthServiceAdapter = inject(AuthServiceAdapter);
  serverErrorObject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  createUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.authServiceAdapter.createUser(userInfo);
  }

  authUser(userInfo: UserInfo): Observable<UserInfo> {
    return this.authServiceAdapter
      .authenticateUser(userInfo)
      .pipe(map((userInfo) => userInfo[0]));
  }

  isAuthenticated(): boolean {
    const user = this.userInfo();
    return !!user && !!user.id && user.id !== "";
  }

  logoutUser(): void {
    this.store.dispatch({ type: "[Auth API] authLogoutUser" });
  }

  updateAuthenticationMessage(message: string | null) {
    this.serverErrorObject.next(message);
  }

  getAuthenticationMessage(): Observable<string | null> {
    return this.serverErrorObject.asObservable();
  }
}
