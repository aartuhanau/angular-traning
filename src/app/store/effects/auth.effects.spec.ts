import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of, throwError } from "rxjs";
import { AuthEffects } from "./auth.effects";
import { authActions } from "../actions/auth.actions";
import { AuthService } from "src/app/auth/services/auth-service";
import { UserInfo } from "src/app/shared/models/user-info";

describe("AuthEffects", () => {
  let effects: AuthEffects;
  let actions$: Observable<any>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const userInfo: UserInfo = new UserInfo("user@example.com", "password");

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj("AuthService", [
      "authUser",
      "createUser",
      "logoutUser",
      "updateAuthenticationMessage",
    ]);
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe("authUser$", () => {
    it("dispatches authUserSuccess when the service resolves a user", (done) => {
      authServiceSpy.authUser.and.returnValue(of(userInfo));
      actions$ = of(authActions.authUser({ userInfo }));

      effects.authUser$.subscribe((action) => {
        expect(action).toEqual(authActions.authUserSuccess({ userInfo }));
        done();
      });
    });

    it("dispatches authUserFailure when the service resolves no user", (done) => {
      authServiceSpy.authUser.and.returnValue(
        of(undefined as unknown as UserInfo),
      );
      actions$ = of(authActions.authUser({ userInfo }));

      effects.authUser$.subscribe((action) => {
        expect(action).toEqual(
          authActions.authUserFailure({ error: "Incorrect login attempt" }),
        );
        done();
      });
    });

    it("dispatches authUserFailure when the service throws", (done) => {
      authServiceSpy.authUser.and.returnValue(
        throwError(() => new Error("network error")),
      );
      actions$ = of(authActions.authUser({ userInfo }));

      effects.authUser$.subscribe((action) => {
        expect(action).toEqual(
          authActions.authUserFailure({ error: "Failed" }),
        );
        done();
      });
    });
  });

  describe("createUser$", () => {
    it("dispatches authUser with the created user info", (done) => {
      authServiceSpy.createUser.and.returnValue(of(userInfo));
      actions$ = of(authActions.authCreateUser({ userInfo }));

      effects.createUser$.subscribe((action) => {
        expect(action).toEqual(authActions.authUser({ userInfo }));
        done();
      });
    });
  });

  describe("redirectOnSuccess$", () => {
    it("clears the auth message and navigates home on authUserSuccess", (done) => {
      actions$ = of(authActions.authUserSuccess({ userInfo }));

      effects.redirectOnSuccess$.subscribe(() => {
        expect(authServiceSpy.updateAuthenticationMessage).toHaveBeenCalledWith(
          null,
        );
        expect(routerSpy.navigate).toHaveBeenCalledWith([""]);
        done();
      });
    });
  });

  describe("updateMessageOnFailure$", () => {
    it("forwards the failure error to the auth message", (done) => {
      actions$ = of(
        authActions.authUserFailure({ error: "Incorrect login attempt" }),
      );

      effects.updateMessageOnFailure$.subscribe(() => {
        expect(authServiceSpy.updateAuthenticationMessage).toHaveBeenCalledWith(
          "Incorrect login attempt",
        );
        done();
      });
    });
  });

  describe("logout$", () => {
    it("clears auth cookies through the service and navigates home on authLogoutUser", (done) => {
      actions$ = of(authActions.authLogoutUser());

      effects.logout$.subscribe(() => {
        expect(authServiceSpy.logoutUser).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith([""]);
        done();
      });
    });
  });
});
