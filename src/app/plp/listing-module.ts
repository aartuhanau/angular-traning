import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PlpPageComponent } from "./components/plp-page/plp-page";
import { SearchBadgeComponent } from "./components/search-badge/search-badge";
import { ControlPanel } from "./components/control-panel/control-panel";
import { ProductListingComponent } from "./components/product-listing/product-listing";
import { ProductListingItemComponent } from "./components/product-listing-item/product-listing-item";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CleanAllButtonComponent } from "./components/clean-all-button/clean-all-button";
import { SearchPanelComponent } from "./components/search-panel-component/search-panel-component";
import { SharedModule } from "../shared/shared-module";
import { FilterFormComponent } from "./components/filter/filter-form";

@NgModule({
  exports: [PlpPageComponent],
  declarations: [
    PlpPageComponent,
    SearchBadgeComponent,
    ControlPanel,
    ProductListingComponent,
    ProductListingItemComponent,
    CleanAllButtonComponent,
    SearchPanelComponent,
    FilterFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, SharedModule],
})
export class ListingModule {}
