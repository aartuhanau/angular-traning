import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "nav-menu",
  imports: [RouterLink],
  templateUrl: "nav-menu.component.html",
  styleUrl: "nav-menu.css",
})
export class NavMenu {}
