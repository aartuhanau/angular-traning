import { Directive, forwardRef } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from "@angular/forms";
@Directive({
  selector: "[passwordMatchInput]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SignUpValidationDirective),
      multi: true,
    },
  ],
  standalone: false,
})
export class SignUpValidationDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (
      control.get("repeatPassword") !== undefined &&
      control.get("password")?.value !== control.get("repeatPassword")?.value
    ) {
      return { passwordMatchInput: { value: control } };
    }
    return null;
  }
}
