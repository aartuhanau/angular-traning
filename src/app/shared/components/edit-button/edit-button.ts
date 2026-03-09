import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "edit-button",
  imports: [RouterLink],
  templateUrl: "edit-button.component.html",
  styleUrl: "./edit-button.css",
})
export class EditButton {
  id = input.required<number>();
}
