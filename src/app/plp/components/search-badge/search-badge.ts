import { Component, inject, Input } from "@angular/core";
import { Router } from "@angular/router";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FacetInfo } from "src/app/shared/models/facet-info";
import { MapFacetService } from "src/app/shared/services/mapper-service";

@Component({
  selector: "aa-search-badge",
  standalone: false,
  templateUrl: "search-badge.component.html",
  styleUrl: "search-badge.css",
})
export class SearchBadgeComponent {
  private router: Router = inject(Router);
  private mapperService: MapFacetService = inject(MapFacetService);
  @Input({ required: true })
  facetInfo!: FacetInfo;
  faXmark = faXmark;

  removeFilter() {
    this.router.navigate([], {
      queryParams: {
        [this.mapperService.getParam(this.facetInfo.code) ?? ""]: null,
      },
      queryParamsHandling: "merge",
    });
  }
}
