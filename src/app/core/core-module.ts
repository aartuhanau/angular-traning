import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { routes } from "../app.routes";

import { SharedModule } from "../shared/shared-module";
import { HeaderComponent } from "./components/header/header";
import { NavMenuComponent } from "./components/nav-menu/compoments/nav-menu";
import { SearchBarComponent } from "./components/search-bar/components/search-bar";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  exports: [HeaderComponent],
  declarations: [HeaderComponent, NavMenuComponent, SearchBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class CoreModule {}
