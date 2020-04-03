import { FormControl, AbstractControl } from '@angular/forms';

export function duplicatePassword(input: FormControl) {

  if (!(input.root as FormControl).get('password')) {
  return null;
  }

  const exactMatch = (input.root as FormControl).get('password').value === input.value;
  return exactMatch && !input.invalid ? null : { mismatchedPassword: true };
}

export function notRequiredOrMinLength(minLength: number) {
  return (control: AbstractControl) => {
     return control.value != null && control.value.length > 0 && control.value.length < minLength ? { minlength: true } : null;
  };
}
