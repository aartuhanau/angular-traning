import { Component, inject, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FacetInfo } from "src/app/shared/models/facet-info";
import { MapFacetService } from "src/app/shared/services/mapper-service";
import { enviroment } from "src/enviroments/enviroment";

@Component({
  selector: "search-badge",
  imports: [FontAwesomeModule],
  templateUrl: "search-badge.component.html",
  styleUrl: "search-badge.css",
})
export class SearchBadge {
  private router: Router = inject(Router);
  private mapperService : MapFacetService = inject(MapFacetService)
  @Input({ required: true })
  facetInfo!: FacetInfo;
  faXmark = faXmark

  removeFilter() {
    this.router.navigate([], {
      queryParams: {
        [this.mapperService.getParam(this.facetInfo.code) ?? '']: null,
      },
      queryParamsHandling: "merge",
    });
  }
}
