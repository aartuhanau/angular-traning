import { Component, Input } from "@angular/core";
import { ProductInfo } from "src/app/shared/models/product-info";

@Component({
  selector: "control-panel",
  standalone: false,
  templateUrl: "control-panel.component.html",
  styleUrl: "./control-panel.css",
})
export class ControlPanel {
  @Input({ required: true })
  public productInfo!: ProductInfo;
}
