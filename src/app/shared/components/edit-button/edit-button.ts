import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "edit-button",
  imports: [],
  templateUrl: "edit-button.component.html",
  styleUrl: "./edit-button.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButton {
  id = input.required<number>();
}
