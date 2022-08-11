import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';
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
  selector: 'app-reservedusers',
  styleUrls: ['./reserved-users.component.css'],
  templateUrl: './reserved-users.component.html',
})
export class ReservedUsersComponent implements OnInit {
  user: any;
  users: User[] = [];
  copy: User[];
  sortedData: User[];
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res) => {
        this.user = res;
        this.users = this.user;
        this.copy = this.users;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSearch(form: NgForm) {
    this.users = this.filterbyuser(form.value.user_id);
    this.sortedData = this.users.slice();
  }
  filterbyuser(user_id: any) {
    return this.copy.filter((obj) => obj.user_id == user_id);
  }
  toDate(date: Date) {
    return date == undefined? 'Not Vaccinated': new Date(date).toLocaleDateString();
  }
  approve(user_id: any) {
    this.userService.approveUser(user_id).subscribe(
      (res: any) => {
        if (res.success == 1)
          document.getElementById('approve')?.setAttribute('disabled', '');
        else alert('Something Wrong..please wait');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
