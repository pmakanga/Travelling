import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService
    ) {

    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
     if (this.loginForm.valid) {
       console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', data.toString());
          this.alertify.message('Logged in succesfully!');
          this.router.navigate(['./dashboard']);
        }, error => {
          console.log(error);
        }

      );
     }
  }

  register() {
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }

}
