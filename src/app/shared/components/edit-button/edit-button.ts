import { Component, Input } from "@angular/core";

@Component({
  standalone: false,
  selector: "aa-edit-button",
  templateUrl: "edit-button.component.html",
  styleUrl: "./edit-button.css",
})
export class EditButtonComponent {
  @Input({ required: true })
  productId!: number;
}
