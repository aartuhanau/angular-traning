import { Component } from "@angular/core";
import { AuthFormComponent } from "../auth-form-component/auth-form-component";

@Component({
  selector: "aa-auth-component",
  standalone: false,
  templateUrl: "./auth-component.html",
  styleUrl: "./auth-component.css",
})
export class AuthComponent {
  type: "signup" | "singin" = "singin";
  changeType(typeValue: "signup" | "singin" = "singin"): void {
    this.type = typeValue;
  }
}
