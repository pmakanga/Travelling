import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) {
    this.authService.authenticate()
    .subscribe(
      data => {
        this.username = data.toString();
      }, error => {
        this.router.navigate(['/main/login']);
      }
    );
   }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out succesfully!');
    this.router.navigate(['/main/login']);
  }

}
