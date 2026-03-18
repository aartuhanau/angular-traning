import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-clean-all-button",
  imports: [],
  template: ` <p>clean-all-button works!</p> `,
  styles: ``,
})
export class CleanAllButton {
  router: Router = inject(Router);
  removeAllFilters() {
    this.router.navigate([], { queryParams: {} });
  }
}
