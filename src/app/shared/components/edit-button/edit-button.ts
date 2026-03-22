import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "aa-edit-button",
  imports: [RouterLink],
  templateUrl: "edit-button.component.html",
  styleUrl: "./edit-button.css",
})
export class EditButtonComponent {
  @Input({ required: true })
  productId!: number;
}
