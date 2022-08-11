import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AfterContentInit } from '@angular/core';
@Component({
  selector: 'app-bookslot',
  templateUrl: './bookslot.component.html',
  styleUrls: ['./bookslot.component.scss'],
  providers: [FormsModule],
})
export class BookslotComponent implements OnInit {
  MAX_DOSAGE = 2;cityArray = new Map<number, [number]>();
  currentCity: number;camp: any;campArray: [any];
  currentSlots: any = [];myMap = new Map<number, [number]>();
  eligible: boolean;fullyVaccinated: boolean;
  waitDays: boolean;dayGap: number;
  booked: boolean;local: any;
  bookedAndPending: boolean;

  loggedUser: any;
  loggerData: any = [];
  constructor(
    public userService: UserService,
    public cookie: CookieService,
    public router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.init();
    this.userService.getCampAndCities().subscribe(
      (res) => {
        this.camp = res;
        this.campArray = this.camp;
        this.campArray.forEach((element) => {
          if (element.seats > 0) {
            this.cityArray.set(element.city, element.city_id);
            if (this.myMap.has(element.city_id)) {
              this.myMap.get(element.city_id)?.push(element.slot);
            } else this.myMap.set(element.city_id, ([] = [element.slot]));
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onBook(form: NgForm) {
    this.userService.bookSlot(form.value).subscribe(
      (res) => {
        this.init();
      },
      (err) => {
        console.log(err);
        console.log(err.error.text);
      }
    );
  }
  getLocalStorage(key: string) {
    this.local = localStorage.getItem(key);
    return JSON.parse(this.local);
  }
  cityChanged(city_id: any) {
    let num = parseInt(city_id.value);
    this.currentSlots.splice(0);
    this.myMap.get(num)?.forEach((element) => {
      this.currentSlots.push(element);
    });
  }
  reload() {
    window.location.reload();
  }
  filterWith(item: any) { }

  toDate(date: Date) {
    return date == undefined? 'Not Vaccinated': new Date(date).toLocaleDateString();
  }
  isAnyPending() {
    this.loggerData.forEach((element: any) => {
      if (element.status == 0) {
        this.bookedAndPending = true;
        this.eligible = false;
      } else {
        this.eligible = true;
      }
      this.dayGap = 45 - this.diff(new Date(element.taken_date));
    });
    return this.bookedAndPending;
  }
  isWaitDays() {
    if (this.isFullyVaccinated()) return false;
    return this.dayGap > 0;
  }
  isFullyVaccinated() {
    let index = this.getLocalStorage('loggerdata').length - 1;
    return (
      this.getLocalStorage('loggerdata')[index].dosage == this.MAX_DOSAGE &&
      this.getLocalStorage('loggerdata')[index].status == 1
    );
  }
  diff(myDate: Date) {
    let difference = new Date().getTime() - myDate.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  }
  toSlotString(slot_id: any) {
    let slots: any = {
      1: 'Morning',
      2: 'Afternoon',
      3: 'Evening',
    };
    return slots[slot_id];
  }
  async init() {
    await this.userService.storeLoggerData(this.getLocalStorage('loggeduser').user_id);
    this.loggedUser = this.getLocalStorage('loggeduser');
    this.loggerData = this.getLocalStorage('loggerdata');
    if (this.loggerData[0] == undefined) {this.eligible = true;
    } else if (this.isAnyPending()) {
      this.eligible = false;
      this.fullyVaccinated = false;
      this.waitDays = false;
    } else if (this.isWaitDays()) {
      this.waitDays = true;
      this.eligible = false;
      this.fullyVaccinated = false;
      this.bookedAndPending = false;
    } else if (this.isFullyVaccinated()) {
      this.waitDays = false;
      this.eligible = false;
      this.fullyVaccinated = true;
      this.bookedAndPending = false;
    }
  }
}
