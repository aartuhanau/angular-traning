import { Component, inject, Input } from "@angular/core";
import { UserInfo } from "src/app/shared/models/user-info";
import { AuthService } from "src/app/auth/services/auth-service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "aa-auth-form-component",
  standalone: false,
  templateUrl: "./auth-form-component.html",
  styleUrl: "./auth-form-component.css",
})
export class AuthFormComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  @Input()
  type: "signup" | "singin" = "singin";
 
  serverErrorMessage$: Observable<string | null> =  this.authService.getAuthenticationMessage()

  user = new UserInfo("", "");

  createNewUser(): void {
    this.authService.createUser(this.user).subscribe((userInfo) => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate([""]);
      } else {
        this.authService.updateAuthenticationMessage("User is not created. Server error");
      }
    });
  }

  authUser(): void {
    this.authService.authUser(this.user).subscribe({
      next: (user) => {
        if (user === null || (Array.isArray(user) && user.length === 0)) {
          this.authService.updateAuthenticationMessage("Incorrect email or password");
        } else {
          this.router.navigate([""]);
        }
      },
      error: (error) => {
         this.authService.updateAuthenticationMessage("Incorrect email or password");
      },
    });
  }

  removeAuthenficationMessage(): void{
    this.authService.updateAuthenticationMessage(null)
  }
}
