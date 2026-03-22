import { Component } from "@angular/core";
import { HeaderComponent } from "./core/components/header/header";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: "app.component.html",
  styleUrls: ["./app.css"],
})
export class App {
  title = "default";
}
