import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./reducers/plp.reducer";
import { ProductInfo } from "../shared/models/product-info";
import { createEntityAdapter } from "@ngrx/entity";
createFeatureSelector("queryMap");
export const adapter = createEntityAdapter<ProductInfo>();

export const { selectAll } = adapter.getSelectors();

export const selectProductState =
  createFeatureSelector<ProductState>("products");

export const selectAllProducts = createSelector(selectProductState, selectAll);
