import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
loginForm: FormGroup;
errorMsg = '';

  
constructor(
  private readonly fb: FormBuilder,
  private readonly auth: AuthService,
  private readonly router: Router
) {}

ngOnInit(): void {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}
onSubmit(): void {
  if (this.loginForm.invalid) {
    this.errorMsg = 'Please fill out the form correctly.';
    return;
  }

  const loginData = this.loginForm.value;
  this.auth.login(loginData).subscribe({
    next: (user) => {
      // Store the entire LoginDTO object as a JSON string
      localStorage.setItem('loginDTO', JSON.stringify(user));

      // Set login details in AuthService
      this.auth.setLoginDetails(user.userRole, user.userId);

      // Navigate based on role
      if (user.userRole === 'Admin') {
        this.router.navigate(['/admin/nav']);
      } else {
        this.router.navigate(['/user/nav']);
      }
    },
    error: () => {
      this.errorMsg = 'Invalid Email or Password';
    }
  });
}

}
