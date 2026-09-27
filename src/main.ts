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
import { StoreModule } from "@ngrx/store";
import { productReducer } from "./app/store/reducers/plp.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { ProductsEffects } from "./app/store/effects/plp.effects";
import { authReducer } from "./app/store/reducers/auth.reducer";
import { authActions } from "./app/store/actions/auth.actions";
import { AuthEffects } from "./app/store/effects/auth.effects";

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
    EffectsModule.forRoot(ProductsEffects, AuthEffects),
    StoreModule.forRoot({ products: productReducer, auth: authReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false,
      trace: true, // Restrict extension to log-only mode in production
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
})
export class MyApplicationModule {}
platformBrowser().bootstrapModule(MyApplicationModule);
