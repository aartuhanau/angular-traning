import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ProductInfo } from "src/app/shared/models/product-info";
import { ProductService } from "src/app/shared/services/product-service";

@Component({
  selector: "aa-edit-form",
  imports: [ReactiveFormsModule],
  templateUrl: "edit-form.component.html",
  styleUrl: "./edit-form.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  @Input({ required: true })
  productInfo!: ProductInfo;
  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      image: [
        `${this.productInfo.image}`,
        [
          Validators.pattern(
            new RegExp(
              /((https?:\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
            ),
          ),
          Validators.required,
        ],
      ],
      title: [`${this.productInfo.title}`, Validators.maxLength(255)],
      price: [
        `${this.productInfo.price}`,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(new RegExp(/^([0-9]*\.)?([0-9])+$/)),
        ],
      ],
      stock: [
        `${this.productInfo.stock}`,
        [Validators.required, Validators.min(0), Validators.pattern(/[0-9]+/)],
      ],
      description: [
        `${this.productInfo.description}`,
        Validators.maxLength(1000),
      ],
    });
  }

  saveProduct() {
    const updatedProduct = this.productForm.value;

    this.productService.saveProduct(
      this.productInfo.id.toString(),
      updatedProduct,
    );
  }

  get title() {
    return this.productForm.get("title");
  }

  get image() {
    return this.productForm.get("image");
  }

  get description() {
    return this.productForm.get("description");
  }

  get price() {
    return this.productForm.get("price");
  }

  get stock() {
    return this.productForm.get("stock");
  }
}
