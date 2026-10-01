import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { authActions } from "../actions/auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/auth/services/auth-service";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  authUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.authUser),
      switchMap((action) =>
        this.authService.authUser(action.userInfo).pipe(
          map((userInfo) => {
            if (userInfo === undefined) {
              return authActions.authUserFailure({
                error: "Incorrect login attempt",
              });
            }

            return authActions.authUserSuccess({ userInfo });
          }),
          catchError((err) =>
            of(authActions.authUserFailure({ error: "Failed" })),
          ),
        ),
      ),
    ),
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.authCreateUser),
      switchMap((action) =>
        this.authService
          .createUser(action.userInfo)
          .pipe(map((userInfo) => authActions.authUser({ userInfo }))),
      ),
    ),
  );

  redirectOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.authUserSuccess),
        tap(() => {
          this.authService.updateAuthenticationMessage(null);
          this.router.navigate([""]);
        }),
      ),
    { dispatch: false },
  );

  updateMessageOnFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.authUserFailure),
        tap(({ error }) => this.authService.updateAuthenticationMessage(error)),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.authLogoutUser),
        tap(() => {
          this.authService.logoutUser();
          this.router.navigate([""]);
        }),
      ),
    { dispatch: false },
  );
}
