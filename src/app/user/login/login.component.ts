import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  isSubmitted: boolean = false;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[^a-zA-Z0-9])/),
      ],
    ],
  });

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.valid) {
      this.service.signin(this.form.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          console.log(res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this.toast.error('Username or password is incorrect.');
          console.log(err);
        },
      });
    }
  }

  // Function - Displaying the Errors when Touched, changed default value or Invalid
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);

    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }
}
