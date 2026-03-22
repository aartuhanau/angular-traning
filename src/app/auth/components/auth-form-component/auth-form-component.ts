import { Component, inject, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserInfo } from "src/app/shared/models/user-info";
import { SignUpValidationDirective } from "src/app/shared/directives/singup-validation-directive";
import { AuthService } from "src/app/shared/services/auth-service";
import { Router } from "@angular/router";

@Component({
  selector: "aa-auth-form-component",
  imports: [FormsModule, SignUpValidationDirective],
  templateUrl: "./auth-form-component.html",
  styleUrl: "./auth-form-component.css",
})
export class AuthFormComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  @Input()
  type: "signup" | "singin" = "singin";
  serverErrorMessage: string | null = null;

  user = new UserInfo("", "");

  createNewUser(): void {
    this.authService.createUser(this.user).subscribe((userInfo) => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate([""]);
      } else {
        this.serverErrorMessage = "User is not created. Server error";
      }
    });
  }

  authUser(): void {
    this.authService.authUser(this.user).subscribe({
      next: (user) => {
        if (user === null || (Array.isArray(user) && user.length === 0)) {
          this.serverErrorMessage = "Incorrect email or password";
        } else {
          this.router.navigate([""]);
        }
      },
      error: (error) => {
        this.serverErrorMessage = "Incorrect email or password";
      },
    });
  }
}
