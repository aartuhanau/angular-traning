import { ParamMap } from "@angular/router";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./reducers/plp.reducer";
import { ProductInfo } from "../shared/models/product-info";
import { createEntityAdapter } from "@ngrx/entity";

export const selectedQueryMap = (state: ProductState) => state.queryMap;

export const selectorQueryMap = createFeatureSelector("queryMap");

export const adapter = createEntityAdapter<ProductInfo>();

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const selectProductState =
  createFeatureSelector<ProductState>("products");

export const selectAllProducts = createSelector(selectProductState, selectAll);
