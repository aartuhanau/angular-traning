import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { deleteProduct, loadProductsActions } from "../actions/plp.actions";
import { ProductService } from "src/app/product/services/product-service";

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsActions.loadProducts),
      switchMap((action) =>
        this.productService.getProducts(action.queryMap).pipe(
          map((products) =>
            loadProductsActions.loadProductsSuccess({ products }),
          ),
          catchError((error) =>
            of(
              loadProductsActions.loadProductsFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) =>
        this.productService
          .deleteProduct(action.productId, action.queryMap)
          .pipe(
            map(() =>
              loadProductsActions.loadProducts({ queryMap: action.queryMap }),
            ),
            catchError((error) =>
              of(
                loadProductsActions.loadProductsFailure({
                  error: error.message,
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
