import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['../admin/admin.component.scss'],
})
export class MedicoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  title = 'vaccination';
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
