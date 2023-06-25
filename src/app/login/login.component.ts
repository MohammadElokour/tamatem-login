import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * A custom class to listen for error states,
 * catch error for required field,
 * catch error for invalid field e.g. invalid email,
 * catch error when trying to submit with unpopulated required fields.
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required, // built in validation for required fields
      Validators.email, // build in validation for email fields
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,

      /* 
        IMPORTANT NOTE: After implementing this validator below I relized this is not suitable for login, 
        but is used for the registration password field. 
      */
      Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        // custom regex for password validation to increase user password strength
      ),
    ]),
  });

  matcher = new MyErrorStateMatcher();
}
