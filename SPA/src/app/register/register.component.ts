import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  SuccessMessage = '';

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, this.passValidator),
    });

    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.confirmPassword.updateValueAndValidity()
      );
  }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const confirmPassword = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== confirmPassword || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }


  register() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.authService.register(this.myForm.value)
      .subscribe(data => {
        this.SuccessMessage = 'Registration Succesful';

      }, error => {
        this.SuccessMessage = 'Some Error';
      });
    }
  }

  login() {
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
  }

}
