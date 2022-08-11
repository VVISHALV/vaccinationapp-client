import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { navbarData } from './nav.data'
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/shared/user.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-medicosidenav',
  templateUrl: './medicosidenav.component.html',
  styleUrls: ['./medicosidenav.component.scss']
})
export class MedicosidenavComponent implements OnInit {

  constructor(public userService: UserService, public cookie: CookieService) { }

  ngOnInit(): void {
    console.log(
      this.navData
    );

  }
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  logOut() {
    if (confirm("Are you sure to Logout ")) {
      this.userService.logout().subscribe(
        res => {
          sessionStorage.clear();
          localStorage.clear();
          this.cookie.delete('loggeduser');
          this.cookie.delete('loggerdata');
          this.cookie.deleteAll();
          this.userService.navigate('/');
        },
        err => {
          console.log(err);
        }
      )

    }
  }
}
