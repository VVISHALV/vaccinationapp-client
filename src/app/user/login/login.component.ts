import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  logged: boolean;
  date: any;
  user_id: any;
  temp: any;
  temps: [any];
  local: any;

  constructor(public userService: UserService, public cookie: CookieService) { }

  ngOnInit(): void { }
  onLogin(form: NgForm) {
    this.userService.loginUser(form.value).subscribe(
      (res: any) => {
        if (res.message == 'no user') {
          this.serverErrorMessages = 'No user exist..Try again';
          setTimeout(() => (this.serverErrorMessages = ''), 4000);
          return;
        }
        if (res.message != 'invalid credentials') {this.userService.loadUser(JSON.parse(JSON.stringify(res)).user_id).subscribe(
              (res) => {
                this.temp = res;
                this.temps = this.temp;
                localStorage.setItem('loggeduser',JSON.stringify(this.temps[0]));
                this.date = new Date(
                  this.getLocalStorage('loggeduser').dob).toLocaleDateString();
                this.userService.navigate('/home');
              },
              (err) => {
                console.log(err);
              }
            );
        } else {
          this.serverErrorMessages = 'Invalid credentials';
          setTimeout(() => (this.serverErrorMessages = ''), 4000);
        }
      },
      (err) => {
        console.log(err);
        this.serverErrorMessages = 'Something Wrong';
        setTimeout(() => (this.serverErrorMessages = ''), 4000);
      }
    );
  }
  getLocalStorage(key: string) {
    this.local = localStorage.getItem(key);
    return JSON.parse(this.local);
  }
}
