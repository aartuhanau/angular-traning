import { Component, Input } from "@angular/core";

@Component({
  selector: "control-panel",
  standalone: false,
  templateUrl: "control-panel.component.html",
  styleUrl: "./control-panel.css",
})
export class ControlPanel {
  @Input({ required: true })
  public id = 0;
}
