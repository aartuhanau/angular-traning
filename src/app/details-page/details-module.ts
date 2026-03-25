import { NgModule } from "@angular/core";
import { DetailsPageComponent } from "./components/details-page/details-page";
import { ReviewSectionComponent } from "./components/review-section/review-section";
import { ProductInfoSectionComponent } from "./components/product-info-section/product-info-section";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared-module";

@NgModule({
  exports: [DetailsPageComponent],
  declarations: [
    DetailsPageComponent,
    ReviewSectionComponent,
    ProductInfoSectionComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class DetailsModule {}
