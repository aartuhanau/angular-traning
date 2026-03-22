import { Component } from "@angular/core";
import { AuthFormComponent } from "../auth-form-component/auth-form-component";

@Component({
  selector: "auth-component",
  imports: [AuthFormComponent],
  templateUrl: "./auth-component.html",
  styleUrl: "./auth-component.scss",
})
export class AuthComponent {}
