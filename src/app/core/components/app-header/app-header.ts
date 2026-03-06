import { Component } from "@angular/core";
import { NavMenu } from "../nav-menu/compoments/nav-menu";
import { SearchBar } from "../search-bar/components/search-bar";

@Component({
  selector: "app-header",
  imports: [NavMenu, SearchBar],
  templateUrl: "app-header.component.html",
  styleUrl: "app-header.css",
})
export class AppHeader {}
