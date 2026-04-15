import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth-service";

@Component({
  selector: "aa-auth-component",
  standalone: false,
  templateUrl: "./auth-component.html",
  styleUrl: "./auth-component.css",
})
export class AuthComponent {
  private authService : AuthService = inject(AuthService)
  type: "signup" | "singin" = "singin";
  changeType(typeValue: "signup" | "singin" = "singin"): void {
    this.type = typeValue;
    this.authService.updateAuthenticationMessage(null)
  }
}
