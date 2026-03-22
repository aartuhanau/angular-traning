import {
  Directive,
  ElementRef,
  inject,
  Input,
  input,
  OnChanges,
  OnInit,
} from "@angular/core";
@Directive({
  selector: "[aaStockColor]",
  standalone: true,
})
export class StockColorDirective implements OnChanges {
  private el = inject(ElementRef);
  @Input()
  aaStockColor!: number | undefined;

  ngOnChanges(): void {
    if (this.aaStockColor == 0) {
      this.el.nativeElement.classList.add(
        "product-info-section__stock--outofstock",
      );
    } else if (
      this.aaStockColor !== undefined &&
      1 < this.aaStockColor &&
      this.aaStockColor < 10
    ) {
      this.el.nativeElement.classList.add(
        "product-info-section__stock--lowstock",
      );
    } else if (this.aaStockColor !== undefined && 10 < this.aaStockColor) {
      this.el.nativeElement.classList.add(
        "product-info-section__stock--instock",
      );
    }
  }
}
