import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

import { AuthFormComponent } from "./auth-form-component";
import { AuthService } from "src/app/auth/services/auth-service";
import { SignUpValidationDirective } from "src/app/shared/directives/singup-validation-directive";

function setInputValue(input: HTMLInputElement, value: string): void {
  input.value = value;
  input.dispatchEvent(new Event("input"));
}

describe("AuthFormComponent", () => {
  let fixture: ComponentFixture<AuthFormComponent>;
  let component: AuthFormComponent;
  let debugElement: DebugElement;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let store: MockStore;
  let serverErrorMessage$: BehaviorSubject<string | null>;

  beforeEach(async () => {
    serverErrorMessage$ = new BehaviorSubject<string | null>(null);
    authServiceSpy = jasmine.createSpyObj<AuthService>("AuthService", [
      "getAuthenticationMessage",
      "updateAuthenticationMessage",
    ]);
    authServiceSpy.getAuthenticationMessage.and.returnValue(
      serverErrorMessage$.asObservable(),
    );

    await TestBed.configureTestingModule({
      declarations: [AuthFormComponent, SignUpValidationDirective],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        provideMockStore(),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, "dispatch");

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  const switchToSignup = async (): Promise<void> => {
    component.type = "signup";
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  const getLoginButton = (): HTMLInputElement | null =>
    debugElement.query(By.css('input[value="Login"]'))?.nativeElement ??
    null;

  const getRegisterButton = (): HTMLInputElement | null =>
    debugElement.query(By.css('input[value="Register"]'))?.nativeElement ??
    null;

  const getEmailInput = (): HTMLInputElement =>
    debugElement.query(By.css("#email")).nativeElement;

  const getPasswordInput = (): HTMLInputElement =>
    debugElement.query(By.css("#password")).nativeElement;

  const getRepeatPasswordInput = (): HTMLInputElement | null =>
    debugElement.query(By.css("#repeatPassword"))?.nativeElement ?? null;

  it("creates the component", () => {
    expect(component).toBeTruthy();
  });

  it("defaults to signin mode, showing only the Login control", () => {
    expect(getLoginButton()).not.toBeNull();
    expect(getRegisterButton()).toBeNull();
    expect(getRepeatPasswordInput()).toBeNull();
  });

  it("shows the Register control and repeat password field in signup mode", async () => {
    await switchToSignup();

    expect(getRegisterButton()).not.toBeNull();
    expect(getRepeatPasswordInput()).not.toBeNull();
    expect(getLoginButton()).toBeNull();
  });

  it("dispatches an authUser action with a copy of the current user on login", () => {
    setInputValue(getEmailInput(), "user@example.com");
    setInputValue(getPasswordInput(), "secret1");
    fixture.detectChanges();

    getLoginButton()!.click();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "[Auth API] authUser",
      userInfo: jasmine.objectContaining({
        email: "user@example.com",
        password: "secret1",
      }),
    });
  });

  it("dispatches a copy of the user, not the live component instance", () => {
    setInputValue(getEmailInput(), "user@example.com");
    setInputValue(getPasswordInput(), "secret1");
    fixture.detectChanges();

    getLoginButton()!.click();

    const dispatchedAction = (store.dispatch as jasmine.Spy).calls.mostRecent()
      .args[0];
    expect(dispatchedAction.userInfo).not.toBe(component.user);

    component.user.email = "changed@example.com";
    expect(dispatchedAction.userInfo.email).toBe("user@example.com");
  });

  it("keeps the Register button disabled while the signup form is invalid", async () => {
    await switchToSignup();

    expect(getRegisterButton()!.disabled).toBeTrue();

    getRegisterButton()!.click();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("enables the Register button and dispatches authCreateUser once the signup form is valid", async () => {
    await switchToSignup();

    setInputValue(getEmailInput(), "user@example.com");
    setInputValue(getPasswordInput(), "longenough");
    setInputValue(getRepeatPasswordInput()!, "longenough");
    fixture.detectChanges();

    expect(getRegisterButton()!.disabled).toBeFalse();

    getRegisterButton()!.click();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "[Auth API] authCreateUser",
      userInfo: jasmine.objectContaining({
        email: "user@example.com",
        password: "longenough",
        repeatPassword: "longenough",
      }),
    });
  });

  it("shows a password-mismatch error when passwords differ in signup mode", async () => {
    await switchToSignup();

    setInputValue(getEmailInput(), "user@example.com");
    setInputValue(getPasswordInput(), "longenough");
    setInputValue(getRepeatPasswordInput()!, "different");
    getRepeatPasswordInput()!.dispatchEvent(new Event("blur"));
    fixture.detectChanges();

    const errorMessages = debugElement
      .queryAll(By.css(".auth-form__error-message"))
      .map((el) => el.nativeElement.textContent.trim());
    expect(errorMessages).toContain("Passwords don't match");
    expect(getRegisterButton()!.disabled).toBeTrue();
  });

  it("clears the authentication message when a field changes", () => {
    setInputValue(getEmailInput(), "user@example.com");
    fixture.detectChanges();

    expect(authServiceSpy.updateAuthenticationMessage).toHaveBeenCalledWith(
      null,
    );
  });

  it("renders the server error message emitted by AuthService", () => {
    serverErrorMessage$.next("Incorrect login attempt");
    fixture.detectChanges();

    const errorMessages = debugElement
      .queryAll(By.css(".auth-form__error-message"))
      .map((el) => el.nativeElement.textContent.trim());
    expect(errorMessages).toContain("Incorrect login attempt");
  });
});
