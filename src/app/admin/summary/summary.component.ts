import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { UserService } from 'src/app/shared/user.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

export interface User {
  firstname: string;
  user_id: number;
  slot: number;
  dosage: number;
  date: Date;
  status: any;
  city: string;
  city_id: number;
  taken_date: Date;
}
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  detail: any;details: [any];
  date: Date;city: any;
  cityArray: [any];user: any;
  users: User[] = [];copy: User[];
  sortedData: User[];FVprcnt: any
  HVprcnt: any;NVprcnt: any
  pageIndex: any = 0
  pageSize: any = 5;count: any
  constructor(public userService: UserService) {
    this.userService.getCities().subscribe(
      (res) => {
        this.city = res;
        this.cityArray = this.city;
      },
      (err) => {
        console.log(err);
      }
    );
    this.userService.getUsers().subscribe(
      (res) => {
        this.user = res;
        this.users = this.user;
        this.copy = this.users;
        this.count = this.users.length
        this.sortedData = this.users.slice(0, this.pageSize);
        this.getCount()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.sortedData
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstname':
          return this.compare(a.firstname, b.firstname, isAsc);
        case 'user_id':
          return this.compare(a.user_id, b.user_id, isAsc);
        case 'slot':
          return this.compare(a.slot, b.slot, isAsc);
        case 'dosage':
          return this.compare(a.dosage, b.dosage, isAsc);
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'taken_ate':
          return this.compare(a.taken_date, b.taken_date, isAsc);
        case 'city':
          return this.compare(a.city, b.city, isAsc);

        default:
          return 0;
      }
    });
  }
  compare(
    a: number | string | Date,
    b: number | string | Date,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  toDate(date: Date) {
    return date == undefined? 'Not Vaccinated': new Date(date).toLocaleDateString();
  }
  cityChanged(city: any) {
    if (city == 0)
      this.users = this.copy;
    else
      this.users = this.filterbycity(city);
    this.count = this.users.length
    this.sortedData = this.users.slice(0, this.pageSize);
    this.pageIndex = 0
    this.getCount()

  }
  filterbycity(city_id: any) {
    return this.copy.filter((obj) => obj.city_id == city_id);
  }
  getPage(event: any) {

    let pageIndex = event.pageIndex
    let pageSize = event.pageSize
    this.sortedData = this.users.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  }
  getCount() {
    let fv = 0
    let hv = 0
    let nv = 0
    this.users.forEach(element => {
      element.dosage == 2 && element.status == 1 ? fv++ :
        element.dosage == 1 && element.status == 1 ? hv++ :
          ((element.dosage == 2 || element.dosage == 1) && element.status == 0) ? nv++ : {}
    });
    this.FVprcnt = (fv / this.count) * 100
    this.HVprcnt = (hv / this.count) * 100
    this.NVprcnt = (nv / this.count) * 100
  }

}
