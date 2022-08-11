import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-addcamp',
  templateUrl: './addcamp.component.html',
  styleUrls: ['./addcamp.component.css'],
})
export class AddcampComponent implements OnInit {
  city: any;
  cityArray: [any];
  campAdded: boolean
  alrdyExist: boolean
  constructor(public userService: UserService) { }

  ngOnInit(): void {
   this.init()
  }
  onSubmit(form: NgForm) {
    this.userService.addCity(form.value).subscribe(
      (res) => {
        this.init()
        this.campAdded = true
        setTimeout(() => this.campAdded = false, 4000);
      },
      (err) => {
        if (err.error.text == 'ER_DUP_ENTRY') {
          this.alrdyExist = true
          setTimeout(() => this.alrdyExist = false, 4000);
        } else
          console.log(err);
      }
    );
  }
  init(){
    this.userService.getCities().subscribe(
      (res) => {
        this.city = res;
        this.cityArray = this.city;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
