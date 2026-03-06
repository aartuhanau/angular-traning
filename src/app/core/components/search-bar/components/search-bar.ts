import { Component } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSistrix } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "search-bar",
  imports: [FontAwesomeModule],
  templateUrl: "search-bar.component.html",
  styleUrl: "search-bar.css",
})
export class SearchBar {
  faSistrix = faSistrix;
}
