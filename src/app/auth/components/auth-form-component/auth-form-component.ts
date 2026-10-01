import { Component, inject, Input } from "@angular/core";
import { UserInfo } from "src/app/shared/models/user-info";
import { AuthService } from "src/app/auth/services/auth-service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "aa-auth-form-component",
  standalone: false,
  templateUrl: "./auth-form-component.html",
  styleUrl: "./auth-form-component.css",
})
export class AuthFormComponent {
  private authService: AuthService = inject(AuthService);
  private store: Store = inject(Store);
  @Input()
  type: "signup" | "singin" = "singin";

  serverErrorMessage$: Observable<string | null> =
    this.authService.getAuthenticationMessage();

  user = new UserInfo("", "");

  createNewUser(): void {
    this.store.dispatch({
      type: "[Auth API] authCreateUser",
      userInfo:  { ...this.user },
    });
  }

  authUser(): void {
    this.store.dispatch({ type: "[Auth API] authUser", userInfo: { ...this.user } });
  }

  removeAuthenficationMessage(): void {
    this.authService.updateAuthenticationMessage(null);
  }
}
