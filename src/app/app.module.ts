import {BrowserModule, platformBrowser, provideClientHydration, withEventReplay} from "@angular/platform-browser";
import {App} from "./app";
import {NgModule} from "@angular/core";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {authReducer} from "./store/reducers/auth.reducer";
import {productReducer} from "./store/reducers/plp.reducer";
import {StoreModule} from "@ngrx/store";
import {AuthEffects} from "./store/effects/auth.effects";
import {ProductsEffects} from "./store/effects/plp.effects";
import {EffectsModule} from "@ngrx/effects";
import {CartModule} from "./cart/cart-module";
import {ProductModule} from "./product/product-module";
import {AuthModule} from "./auth/auth-module";
import {SharedModule} from "./shared/shared-module";
import {routes} from "./app.routes";
import {RouterModule} from "@angular/router";
import {CoreModule} from "./core/core-module";

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
        EffectsModule.forRoot([ProductsEffects, AuthEffects]),
        StoreModule.forRoot({products: productReducer, auth: authReducer}),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: false,
            trace: true, // Restrict extension to log-only mode in production
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
    ],
    providers: [
      provideClientHydration(withEventReplay())
    ],

})
export class MyApplicationModule {
}