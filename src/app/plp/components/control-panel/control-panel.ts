import { Component, Input } from "@angular/core";
import { AddToCartButtonComponent } from "src/app/shared/components/add-to-cart-button/add-to-cart-button";
import { DeleteButtonComponent } from "src/app/shared/components/delete-button/delete-button";
import { EditButtonComponent } from "src/app/shared/components/edit-button/edit-button";

@Component({
  selector: "control-panel",
  imports: [
    DeleteButtonComponent,
    EditButtonComponent,
    AddToCartButtonComponent,
  ],
  templateUrl: "control-panel.component.html",
  styleUrl: "./control-panel.css",
})
export class ControlPanel {
  @Input({ required: true })
  public id = 0;
}
