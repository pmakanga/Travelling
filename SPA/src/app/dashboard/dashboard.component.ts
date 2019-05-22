import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username = '';
  constructor(private authService: AuthService, private router: Router) {
    this.authService.authenticate()
    .subscribe(
      data => {
        this.username = data.toString();
      }, error => {
        this.router.navigate(['/main/login']);
        // console.log(error);
      }
    );
   }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/main/login']);
  }

}
