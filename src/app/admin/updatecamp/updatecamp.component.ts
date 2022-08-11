import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
interface campDetails {
  city: any;
  morning: number;
  afternoon: number;
  evening: number;
}
@Component({
  selector: 'app-updatecamp',
  templateUrl: './updatecamp.component.html',
  styleUrls: ['./updatecamp.component.css'],
})
export class UpdatecampComponent implements OnInit {
  temp: campDetails = {
    city: '',
    morning: 0,
    afternoon: 0,
    evening: 0,
  };
  map = new Map<any, campDetails>();
  serverErrorMessages:any
  camp: any;city:any
  campArray: [any];cityArray:any
  updated: boolean;
  constructor(
    public userService: UserService,
    private _changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.getCities().subscribe(res=>{this.city=res;
      this.cityArray=this.city;
    },err=>{console.log(err);
    })
   this.init();
  }

  onUpdate(form: NgForm) {
    try {
      if (form.value.morning != undefined) {this.userService.updateSlot({city_id: this.getCityId(form.value.city),slot: 1,seats: form.value.morning,}).subscribe((res) => {}, (err) => {console.log(err);});}
      if (form.value.afternoon != undefined) {this.userService.updateSlot({city_id: this.getCityId(form.value.city),slot: 2,seats: form.value.afternoon,}).subscribe((res) => {}, (err) => {console.log(err);});}
      if (form.value.evening != undefined) {this.userService.updateSlot({city_id: this.getCityId(form.value.city),slot: 3,seats: form.value.evening,}).subscribe((res) => {}, (err) => {console.log(err);});}
     
      this.updated = true;
      setTimeout(() => (this.updated = false), 4000);
    } catch (e) {
      this.serverErrorMessages = 'Something Wrong';
      setTimeout(() => (this.serverErrorMessages = ''), 4000);
    }
  }
  getCityId(city: any) {
    let temp = this.cityArray.filter(
      (obj:any) => obj.city.toUpperCase() == city.toUpperCase()
    );
    return temp[0].city_id;
  }
  init(){
    this.userService.getCampAndCities().subscribe(
      (res) => {
        this.camp = res;
        this.campArray = this.camp;

        this.campArray.forEach((element) => {
          if (this.map.has(element.city_id)) {
            element.slot == 1 ? ((this.map.get(element.city_id) as campDetails).morning = element.seats) : {};
            element.slot == 2 ? ((this.map.get(element.city_id) as campDetails).afternoon = element.seats) : {};
            element.slot == 3 ? ((this.map.get(element.city_id) as campDetails).evening = element.seats) : {};
          } else {
            this.map.set(
              element.city_id,
              (this.temp = {
                city: element.city,
                morning: element.slot == 1 ? element.seats : 0,
                afternoon: element.slot == 2 ? element.seats : 0,
                evening: element.slot == 3 ? element.seats : 0,
              })
            );
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
