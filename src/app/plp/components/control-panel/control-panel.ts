import { Component, Input } from "@angular/core";
import { AddToCartButton } from "src/app/shared/components/add-to-cart-button/add-to-cart-button";
import { DeleteButton } from "src/app/shared/components/delete-button/delete-button";
import { EditButton } from "src/app/shared/components/edit-button/edit-button";

@Component({
  selector: "control-panel",
  imports: [DeleteButton, EditButton, AddToCartButton],
  templateUrl: "control-panel.component.html",
  styleUrl: "./control-panel.css",
})
export class ControlPanel {
  @Input({ required: true })
  public id = 0;
}
