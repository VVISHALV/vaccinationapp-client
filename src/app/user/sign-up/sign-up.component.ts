import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService],
})
export class SignUpComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(public userService: UserService) { }
 today:any
  
  ngOnInit(): void {this.today = new Date().toISOString().substring(0, 10);
  }

  onSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe(
      (res: any) => {
        if (res.message == 'registered successfully') {
          this.userService.navigate("/login")
          this.showSucessMessage = true;
          setTimeout(() => (this.showSucessMessage = false), 4000);
        }
        if (res.message == 'already registered')
        this.serverErrorMessages = 'Already registered';
      },
      (err) => {
        this.serverErrorMessages = 'Something went wrong.';
      }
    );
  }
}
