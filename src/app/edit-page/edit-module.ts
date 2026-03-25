import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EditFormComponent } from "./components/edit-form/edit-form";
import { EditPageComponent } from "./components/edit-page/edit-page";

@NgModule({
  exports: [EditPageComponent],
  declarations: [EditFormComponent, EditPageComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditModule {}
