import {
  Directive,
  ElementRef,
  forwardRef,
  inject,
  input,
} from "@angular/core";
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
})
export class SignUpValidationDirective implements Validator {
  private el = inject(ElementRef);
  readonly passwordMatchInput = input<string>();
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value !== this.passwordMatchInput()) {
      return { passwordMatchInput: { value: control } };
    }
    return null;
  }
}
