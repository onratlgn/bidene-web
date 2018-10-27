import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.interface';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  user: User;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    console.log('Im created');
    console.log(this.authService.isLoggedIn);
  }

  login() {
    this.authService.loginWithGoogle().subscribe(() => {
      if (this.authService.isLoggedIn) {
        console.log('component confirmed login');
        this.authService.user.subscribe(user => this.user = user);
      }
    });
  }

  logout() {
    this.authService.logout();
    console.log('component confirmed logout');
  }



}
