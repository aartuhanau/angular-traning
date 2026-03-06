import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProductInfo } from 'src/app/shared/models/productinfo';
@Component({
  selector: 'product-listing-item',
  imports: [CurrencyPipe],
  templateUrl: 'product-listing-item.component.html',
  styleUrl: 'product-listing-item.css',
})
export class ProductListingItem {
  productInfo = input.required<ProductInfo>()
}
