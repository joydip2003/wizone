
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  errorMsg = '';
  successMsg = '';
  constructor(private readonly fb:FormBuilder,private readonly router:Router,private readonly auth:AuthService) { }

SignUpForm: FormGroup;

saveForm() {
  console.log('Form Value:', this.SignUpForm.value);
  if (this.SignUpForm.invalid) {
    this.errorMsg = 'Please fill out all required fields correctly.';
    this.SignUpForm.markAllAsTouched(); // Mark all fields as touched to show errors
    return;
  }

  const user: User = {
    username: this.SignUpForm.get('username')?.value,
    email: this.SignUpForm.get('email')?.value,
    mobileNumber: this.SignUpForm.get('mobileNumber')?.value,
    password: this.SignUpForm.get('password')?.value,
    userRole: this.SignUpForm.get('role')?.value,
  };

  this.auth.register(user).subscribe({
    
    next: (response) => {
      this.successMsg = 'Signup successful!';
      setTimeout(() => this.router.navigate(['/login']), 1000);
    },
    error: (err) => {
      if(err.status=== 409){
        alert("User With Email Already Exists")
      }
      this.errorMsg = 'Registration failed. ' + (err.error?.message ?? 'Please try again.');
    }
  });
}
  ngOnInit(): void {
    this.SignUpForm=this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      mobileNumber:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required]],
      role:['',[Validators.required]]
    },{validators:PasswordMismatch})
  }

}



export function PasswordMismatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { PasswordMismatch: true };
}