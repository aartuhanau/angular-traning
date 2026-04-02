import { NgModule } from "@angular/core";
import { DetailsPageComponent } from "./components/details-page/details-page";
import { ReviewSectionComponent } from "./components/review-section/review-section";
import { ProductInfoSectionComponent } from "./components/product-info-section/product-info-section";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared-module";
import { PlpPageComponent } from "./components/plp-page/plp-page";
import { EditPageComponent } from "./components/edit-page/edit-page";
import { SearchBadgeComponent } from "./components/search-badge/search-badge";
import { ControlPanel } from "./components/control-panel/control-panel";
import { ProductListingComponent } from "./components/product-listing/product-listing";
import { ProductListingItemComponent } from "./components/product-listing-item/product-listing-item";
import { CleanAllButtonComponent } from "./components/clean-all-button/clean-all-button";
import { FilterFormComponent } from "./components/filter/filter-form";
import { SearchPanelComponent } from "./components/search-panel-component/search-panel-component";
import { EditFormComponent } from "./components/edit-form/edit-form";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StockTextPipe } from "./pipes/stock-text-pipe";

@NgModule({
  exports: [DetailsPageComponent, PlpPageComponent, EditPageComponent],
  declarations: [
    DetailsPageComponent,
    ReviewSectionComponent,
    ProductInfoSectionComponent,
    PlpPageComponent,
    SearchBadgeComponent,
    ControlPanel,
    ProductListingComponent,
    ProductListingItemComponent,
    CleanAllButtonComponent,
    SearchPanelComponent,
    FilterFormComponent,
    EditFormComponent,
    EditPageComponent,
    StockTextPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, SharedModule],
})
export class ProductModule {}
