import { Component, inject } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSistrix } from "@fortawesome/free-brands-svg-icons";
import { SearchState } from "src/app/shared/models/search-state";

@Component({
  selector: "search-bar",
  imports: [FontAwesomeModule],
  templateUrl: "search-bar.component.html",
  styleUrl: "search-bar.css",
})
export class SearchBar {
  searchState = inject(SearchState);
  faSistrix = faSistrix;

  updateSearchState(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchState.updateValue(inputValue);
  }
}
