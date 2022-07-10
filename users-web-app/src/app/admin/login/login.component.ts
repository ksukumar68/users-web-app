import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

interface Admin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  user: Admin = {} as Admin;
  constructor(
    ) {
    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {

  }
  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

}
