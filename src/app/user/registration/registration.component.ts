import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FirstkeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstkeyPipe, RouterLink],
  templateUrl: './registration.component.html',
  styles: ``,
})
export class RegistrationComponent {
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService, // Injected the Server Service
    private toast: ToastrService // Injected the Toast Service
  ) {}

  isSubmitted: boolean = false;

  // Validation Error Function : Custom validation for the error
  passwordMatchValidator: ValidatorFn = (controls: AbstractControl): null => {
    const password = controls.get('password');
    const confirmPassword = controls.get('confirmPassword');

    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({ passwordMisMatch: true });
    else confirmPassword?.setErrors(null);
    return null;
  };

  // Request - for the form
  form = this.formBuilder.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/(?=.*[^a-zA-Z0-9])/),
        ],
      ],
      confirmPassword: [''],
    },
    { validators: this.passwordMatchValidator } // Custom Validation for ConfirmPassword
  );

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            console.log(res);
            this.form.reset();
            this.isSubmitted = false;
            this.toast.success('New user created!', 'Registration successful');
          }
        },
        error: (err) => {
          debugger;
          if (err.error.errors) {
            err.error.errors.forEach((x: any) => {
              switch (x.code) {
                case 'DuplicateEmail':
                  this.toast.error(
                    'Email is already taken',
                    'Registration failed!'
                  );
                  break;
                case 'DuplicateUserName':
                  this.toast.error(
                    'Email is already taken',
                    'Registration failed!'
                  );
                  break;

                default:
                  this.toast.error('No user created', 'Registration failed!');
                  console.log(x);
                  break;
              }
            });
          } else {
            console.log('error: ' + err);
          }
        },
      });
    }
  }

  // Function - Displaying the Errors when Touched and Invalid
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);

    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }
}
