import { NgModule } from "@angular/core";
import { BrowserModule, platformBrowser } from "@angular/platform-browser";
import { App } from "./app/app";
import { CoreModule } from "./app/core/core-module";
import { RouterModule } from "@angular/router";
import { routes } from "./app/app.routes";
import { SharedModule } from "./app/shared/shared-module";
import { AuthModule } from "./app/auth/auth-module";
import { CartModule } from "./app/cart/cart-module";
import { ProductModule } from "./app/product/product-module";

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
    ProductModule,
    CartModule,
  ],
})
export class MyApplicationModule {}
platformBrowser().bootstrapModule(MyApplicationModule);
