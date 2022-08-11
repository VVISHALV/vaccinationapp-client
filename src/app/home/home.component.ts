import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { CookieService } from 'ngx-cookie-service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  date: any;
  user_id: any;
  temp: any;
  temps: [any];
  constructor(public userService: UserService, public cookie: CookieService) {}

  ngOnInit(): void {
    this.userService.storeLoggerData(
      this.getLocalStorage('loggeduser').user_id
    );
  }
  title = 'vaccination';
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  getCookie(key: string) {
    return JSON.parse(this.cookie.get(key));
  }
  getLocalStorage(key: string) {
    let local: any = localStorage.getItem(key);

    return JSON.parse(local);
  }
}
