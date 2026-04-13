import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { backendConfig } from "src/app/shared/endpoints";
import { UserInfo } from "src/app/shared/models/user-info";
import { RequestBuilderHelper } from "src/app/shared/services/request-builder-helper";

@Injectable({
  providedIn: "root",
})
export class AuthServiceAdapter {
  private requestBuilderService: RequestBuilderHelper =
    inject(RequestBuilderHelper);
  private http: HttpClient = inject(HttpClient);

  createUser(userInfo: UserInfo): Observable<UserInfo> {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.createUser,
    );
    return this.http.post<UserInfo>(url, userInfo);
  }

  authenticateUser(userInfo: UserInfo): Observable<UserInfo[]> {
    let url = this.requestBuilderService.getTargetUrl(
      backendConfig.backendUrls.authUser,
    );
    url = url.replace("{id}", userInfo.email);
    url = url.replace("{password}", userInfo.password);
    return this.http.get<UserInfo[]>(url);
  }
}
