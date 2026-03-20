import { Component, inject } from "@angular/core";
import { SearchBadge } from "../search-badge/search-badge";
import { ActivatedRoute } from "@angular/router";
import { FacetInfo } from "src/app/shared/models/facet-info";
import { FacetService } from "src/app/shared/services/facet-service";
import { map, Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "search-badge-component",
  imports: [SearchBadge, AsyncPipe],
  templateUrl: "search-badge-component.component.html",
  styleUrl: "search-badge-component.css",
})
export class SearchBadgeComponent {
  facetList$: Observable<FacetInfo[]>;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private facetService: FacetService = inject(FacetService);

  constructor() {
    this.facetList$ = this.route.queryParamMap.pipe(
      map((queryMap) => this.facetService.getFacetList(queryMap)),
    );
  }
}
