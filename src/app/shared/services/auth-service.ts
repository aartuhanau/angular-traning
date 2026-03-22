import { inject, Injectable } from "@angular/core";
import { UserInfo } from "../models/user-info";
import { RequestBuilderService } from "./request-builder-service";
import { backendConfig } from "../endpoints";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private requestBuilderService: RequestBuilderService = inject(
    RequestBuilderService,
  );
  private http: HttpClient = inject(HttpClient);
  private USER_TOKEN = "userToken";
  private USER_NAME = "userName";

  createUser(userInfo: UserInfo): Observable<UserInfo> {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.createUser,
    );
    return this.http.post<UserInfo>(url, userInfo).pipe(
      tap((userInfo) => {
        if (userInfo?.id !== undefined) {
          localStorage.setItem(this.USER_TOKEN, userInfo?.id);
          localStorage.setItem(this.USER_NAME, userInfo.email);
        }
      }),
    );
  }

  authUser(userInfo: UserInfo): Observable<UserInfo[]> {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.authUser,
    );
    url = url.replace("{id}", userInfo.email);
    url = url.replace("{password}", userInfo.password);
    return this.http.get<UserInfo[]>(url).pipe(
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
}
