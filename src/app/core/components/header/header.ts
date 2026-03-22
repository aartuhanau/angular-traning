import { Component } from "@angular/core";
import { NavMenuComponent } from "../nav-menu/compoments/nav-menu";
import { SearchBarComponent } from "../search-bar/components/search-bar";

@Component({
  selector: "aa-header",
  imports: [NavMenuComponent, SearchBarComponent],
  templateUrl: "header.component.html",
  styleUrl: "header.css",
})
export class HeaderComponent {}
