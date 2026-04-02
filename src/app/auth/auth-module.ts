import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { routes } from "../app.routes";
import { SharedModule } from "../shared/shared-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./components/auth-component/auth-component";
import { AuthFormComponent } from "./components/auth-form-component/auth-form-component";

@NgModule({
  exports: [AuthComponent],
  declarations: [AuthComponent, AuthFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
