import { Component, inject, OnInit } from "@angular/core";
import { ProductService } from "src/app/shared/services/product-service";
import { ActivatedRoute } from "@angular/router";
import { ProductInfo } from "src/app/shared/models/product-info";
import { Observable } from "rxjs";

@Component({
  selector: "edit-page",
  standalone: false,
  templateUrl: "edit-page.component.html",
  styleUrl: "./edit-page.css",
})
export class EditPageComponent implements OnInit {
  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  productId!: string;
  product$!: Observable<ProductInfo>;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id") ?? "";
    this.product$ = this.productService.getProduct(this.productId);
  }
}
