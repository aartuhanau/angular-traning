import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FacetInfo } from "src/app/shared/models/facet-info";
import { FacetService } from "src/app/shared/services/facet-service";
import { map, Observable } from "rxjs";

@Component({
  selector: "aa-search-panel-component",
  standalone: false,
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
