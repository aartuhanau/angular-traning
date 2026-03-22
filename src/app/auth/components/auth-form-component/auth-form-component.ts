import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserInfo } from "src/app/shared/models/user-info";

@Component({
  selector: "auth-form-component",
  imports: [FormsModule],
  templateUrl: "./auth-form-component.html",
  styleUrl: "./auth-form-component.scss",
})
export class AuthFormComponent {
  @Input()
  type: "signup" | "singin" = "singin";

  user = new UserInfo("", "");
}
