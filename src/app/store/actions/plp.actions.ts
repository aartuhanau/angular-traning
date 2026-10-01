import { ParamMap } from "@angular/router";
import { createAction, createActionGroup, props } from "@ngrx/store";
import { ProductInfo } from "src/app/shared/models/product-info";

export const loadProductsSuccess = createAction(
  "[Products API] loadProductsSuccess",
  props<{ products: ProductInfo[] }>,
);

export const deleteProduct = createAction(
  "[Products API] delete product",
  props<{ productId: number; queryMap: ParamMap }>(),
);

export const loadProductsActions = createActionGroup({
  source: "Products API",
  events: {
    LoadProducts: props<{ queryMap: ParamMap }>(),
    LoadProductsSuccess: props<{
      products: ProductInfo[];
    }>(),
    LoadProductsFailure: props<{ error: string }>(),
  },
});
