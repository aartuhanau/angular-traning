import { Component, inject, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "aa-clean-all-button",
  standalone: false,
  templateUrl: "clean-all-button.component.html",
  styleUrl: "clean-all-button.css",
})
export class CleanAllButtonComponent {
  router: Router = inject(Router);
  @Input()
  showButton: boolean = false;

  removeAllFilters() {
    this.router.navigate([], { queryParams: {} });
  }
}
