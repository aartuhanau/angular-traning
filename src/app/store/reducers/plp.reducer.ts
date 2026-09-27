import { convertToParamMap, ParamMap } from "@angular/router";
import { EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ProductInfo } from "src/app/shared/models/product-info";
import { loadProductsActions } from "../actions/plp.actions";
import { adapter } from "../plp.state";

export interface ProductState extends EntityState<ProductInfo> {
  queryMap: ParamMap;
}

const initialState: ProductState = {
  ids: [],
  entities: {},
  queryMap: convertToParamMap({}),
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsActions.loadProductsSuccess, (state, action) => {
    return adapter.setAll(action.products, state);
  }),
);
