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
          map((userInfo) => authActions.authUserSuccess({ userInfo })),
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
        tap(() => this.router.navigate([""])),
      ),
    { dispatch: false },
  );
}
