import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  date: any;
  user_id: any;
  temp: any;
  temps: [any];
  local: any;
  constructor(public userService: UserService, public cookie: CookieService) { }

  ngOnInit(): void {
    this.date = new Date(
      this.getLocalStorage('loggeduser').dob
    ).toLocaleDateString();
    this.userService.storeLoggerData(
      this.getLocalStorage('loggeduser').user_id
    );
  }

  getLocalStorage(key: string) {
    this.local = localStorage.getItem(key);
    return JSON.parse(this.local);
  }
}
