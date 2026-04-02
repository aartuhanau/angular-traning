import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddToCartButtonComponent } from "./components/add-to-cart-button/add-to-cart-button";
import { DeleteButtonComponent } from "./components/delete-button/delete-button";
import { StarRatingComponent } from "./components/star-rating/star-rating";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { routes } from "../app.routes";
import { EditButtonComponent } from "./components/edit-button/edit-button";
import { SearchPipe } from "./pipes/search-pipe";
import { StockColorDirective } from "./directives/stock-color-directive";
import { SignUpValidationDirective } from "./directives/singup-validation-directive";

@NgModule({
  exports: [
    AddToCartButtonComponent,
    DeleteButtonComponent,
    StarRatingComponent,
    EditButtonComponent,
    RouterModule,
    FontAwesomeModule,
    SearchPipe,
    StockColorDirective,
    SignUpValidationDirective,
  ],
  declarations: [
    AddToCartButtonComponent,
    DeleteButtonComponent,
    StarRatingComponent,
    EditButtonComponent,
    SearchPipe,
    StockColorDirective,
    SignUpValidationDirective,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
})
export class SharedModule {}
