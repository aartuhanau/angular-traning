import { convertToParamMap } from "@angular/router";
import { productReducer, ProductState } from "./plp.reducer";
import { loadProductsActions } from "../actions/plp.actions";
import { ProductInfo } from "src/app/shared/models/product-info";
import { adapter } from "../plp.state";

describe("productReducer", () => {
  const buildProduct = (id: number, title: string): ProductInfo => ({
    id,
    title,
    price: 10,
  });

  it("returns the initial state for an unknown action", () => {
    const state = productReducer(undefined, { type: "@@INIT" });

    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.queryMap).toEqual(convertToParamMap({}));
  });

  it("stores all products on loadProductsSuccess", () => {
    const products = [buildProduct(1, "Chair"), buildProduct(2, "Table")];

    const state = productReducer(
      undefined,
      loadProductsActions.loadProductsSuccess({ products }),
    );

    expect(state.ids).toEqual([1, 2]);
    expect(state.entities[1]).toEqual(products[0]);
    expect(state.entities[2]).toEqual(products[1]);
  });

  it("replaces the previously stored products on a subsequent loadProductsSuccess", () => {
    const initialLoad = productReducer(
      undefined,
      loadProductsActions.loadProductsSuccess({
        products: [buildProduct(1, "Chair"), buildProduct(2, "Table")],
      }),
    );

    const secondLoad = productReducer(
      initialLoad,
      loadProductsActions.loadProductsSuccess({
        products: [buildProduct(3, "Sofa")],
      }),
    );

    expect(secondLoad.ids).toEqual([3]);
    expect(secondLoad.entities[1]).toBeUndefined();
    expect(secondLoad.entities[2]).toBeUndefined();
    expect(secondLoad.entities[3]).toEqual(buildProduct(3, "Sofa"));
  });

  it("clears all products when loadProductsSuccess is dispatched with an empty list", () => {
    const initialLoad = productReducer(
      undefined,
      loadProductsActions.loadProductsSuccess({
        products: [buildProduct(1, "Chair")],
      }),
    );

    const clearedState = productReducer(
      initialLoad,
      loadProductsActions.loadProductsSuccess({ products: [] }),
    );

    expect(clearedState.ids).toEqual([]);
    expect(clearedState.entities).toEqual({});
  });

  it("preserves the queryMap already present in state", () => {
    const stateWithQuery: ProductState = {
      ...adapter.getInitialState(),
      queryMap: convertToParamMap({ page: "2" }),
    };

    const state = productReducer(
      stateWithQuery,
      loadProductsActions.loadProductsSuccess({
        products: [buildProduct(1, "Chair")],
      }),
    );

    expect(state.queryMap.get("page")).toBe("2");
  });
});
