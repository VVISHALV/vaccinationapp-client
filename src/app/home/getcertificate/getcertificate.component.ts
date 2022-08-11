import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-getcertificate',
  templateUrl: './getcertificate.component.html',
  styleUrls: ['./getcertificate.component.scss'],
})
export class GetcertificateComponent implements OnInit {
  serverErrorMessages: any;
  constructor(
    public cookie: CookieService,
    public userService: UserService,
    public route: Router
  ) { }

  ngOnInit(): void { }
  @ViewChild('content') content: ElementRef;
  onExportPdf() {
    if (this.hasVaccinated()) this.route.navigate(['/home/thecertificate']);
    else {
      this.serverErrorMessages = 'You have no certificate to download';
      setTimeout(() => (this.serverErrorMessages = ''), 4000);
    }
  }
  getLocalStorage(key: string) {
    let local: any = localStorage.getItem(key);
    return JSON.parse(local);
  }
  hasVaccinated() {
    if (this.getLocalStorage('loggerdata')[0] != undefined) {
      return this.getLocalStorage('loggerdata')[0].status == 1;
    } else {
      return false;
    }
  }
}
