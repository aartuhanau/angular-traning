import { NgModule } from "@angular/core";
import { BrowserModule, platformBrowser } from "@angular/platform-browser";
import { App } from "./app/app";
import { CoreModule } from "./app/core/core-module";
import { RouterModule } from "@angular/router";
import { routes } from "./app/app.routes";
import { SharedModule } from "./app/shared/shared-module";
import { AuthModule } from "./app/auth/auth-module";
import { EditModule } from "./app/edit-page/edit-module";
import { CartModule } from "./app/cart/cart-module";
import { ListingModule } from "./app/plp/listing-module";
import { DetailsModule } from "./app/details-page/details-module";

@NgModule({
  bootstrap: [App],
  declarations: [App],
  exports: [App],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
    SharedModule,
    AuthModule,
    EditModule,
    CartModule,
    ListingModule,
    DetailsModule,
  ],
})
export class MyApplicationModule {}
platformBrowser().bootstrapModule(MyApplicationModule);
