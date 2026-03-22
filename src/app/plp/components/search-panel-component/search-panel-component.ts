import { Component, inject } from "@angular/core";
import { SearchBadgeComponent } from "../search-badge/search-badge";
import { ActivatedRoute } from "@angular/router";
import { FacetInfo } from "src/app/shared/models/facet-info";
import { FacetService } from "src/app/shared/services/facet-service";
import { map, Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { CleanAllButtonComponent } from "../clean-all-button/clean-all-button";

@Component({
  selector: "aa-search-panel-component",
  imports: [SearchBadgeComponent, AsyncPipe, CleanAllButtonComponent],
  templateUrl: "search-panel.component.html",
  styleUrl: "search-panel.css",
})
export class SearchPanelComponent {
  facetList$: Observable<FacetInfo[]>;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private facetService: FacetService = inject(FacetService);

  constructor() {
    this.facetList$ = this.route.queryParamMap.pipe(
      map((queryMap) => this.facetService.getFacetList(queryMap)),
    );
  }
}
