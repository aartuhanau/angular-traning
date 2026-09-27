import { Component, inject, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  standalone: false,
  selector: "aa-delete-button",
  templateUrl: "delete-button.component.html",
  styleUrl: "./delete-button.css",
})
export class DeleteButtonComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  @Input({ required: true })
  productId = 0;

  deleteProduct(): void {
    this.store.dispatch({
      type: "[Products API] delete product",
      productId: this.productId,
      queryMap: this.route.snapshot.queryParamMap,
    });
  }
}
