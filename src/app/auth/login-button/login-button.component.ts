import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    console.log('Im created');
  }

  login(){
    this.authService.loginWithGoogle();
    console.log('component confirmed login');
  }

  logout(){
    this.authService.logout();
    console.log('component confirmed logout');
  }



}
