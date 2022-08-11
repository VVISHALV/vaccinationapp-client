import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements AfterViewInit {

  loggedUser: any
  loggerData: any
  dosage_2date = "--"
  dosage_2city = "--"
  qrData: any
  constructor() { }
  ngAfterViewInit(): void {


  }

  ngOnInit(): void {
    this.loggedUser = this.getLocalStorage("loggeduser")
    this.loggerData = this.getLocalStorage("loggerdata")
    let mydiv: any = document.querySelector("#mydiv")
    mydiv.innerHTML += `<h4 style="display:inline; font-weight: bold;">Name</h4>`
    mydiv.innerHTML += `<h4 style="display:inline; padding: 250px" >${this.getLocalStorage("loggeduser").firstname}</h4><br><br>`
    mydiv.innerHTML += `<h4 style="display:inline; font-weight: bold;">Date Of Birth</h4>`
    mydiv.innerHTML += `<h4 style="display:inline; padding: 200px" >${this.toDate(this.getLocalStorage("loggeduser").dob)}</h4><br><br>`
    mydiv.innerHTML += `<h4 style="display:inline; font-weight: bold;">Mobile</h4>`
    mydiv.innerHTML += `<h4 style="display:inline; padding: 240px" >${this.getLocalStorage("loggeduser").mobile}</h4><br><br>`
    mydiv.innerHTML += `<h4 style="display:inline; font-weight: bold;">Aadhaar</h4>`
    mydiv.innerHTML += `<h4 style="display:inline; padding: 230px" >${this.getLocalStorage("loggeduser").aadhaar}</h4>`
    let mydiv1: any = document.querySelector("#mydiv1")
    mydiv1.innerHTML += `<h4 style="display:inline; font-weight: bold;">Date Of 1st Dose</h4>`
    mydiv1.innerHTML += `<h4 style="display:inline; padding: 170px">${this.toDate(this.getLocalStorage("loggerdata")[0].taken_date)}</h4><br><br>`
    mydiv1.innerHTML += `<h4 style="display:inline; font-weight: bold;">Vaccinated At</h4>`
    mydiv1.innerHTML += `<h4 style="display:inline; padding: 190px">${this.getLocalStorage("loggerdata")[0].city}</h4><br><br>`
    mydiv1.innerHTML += `<h4 style="display:inline; font-weight: bold;">Date Of 2nd Dose</h4>`
    if (this.getLocalStorage("loggerdata")[1] != undefined && this.getLocalStorage("loggerdata")[1].taken_date != undefined) {
      this.dosage_2date = this.toDate(this.getLocalStorage("loggerdata")[1].taken_date)
      this.dosage_2city = (this.getLocalStorage("loggerdata")[1].city)
    }
    mydiv1.innerHTML += `<h4 style="display:inline; padding: 170px">${this.dosage_2date}</h4><br><br>`
    mydiv1.innerHTML += `<h4 style="display:inline; font-weight: bold;">Vaccinated At</h4>`
    mydiv1.innerHTML += `<h4 style="display:inline; padding: 195px">${this.dosage_2city}</h4>`
    this.generateQr()
  }

  getLocalStorage(key: string) {
    let local: any = (localStorage.getItem(key))
    return (JSON.parse(local));
  }
  toDate(date: Date) {
    return date == undefined ? "Not Vaccinated" : new Date(date).toLocaleDateString();
  }
  generateQr() {
    this.qrData = `Name  ${this.getLocalStorage("loggeduser").firstname}\nDate Of Birth  ${this.toDate(this.getLocalStorage("loggeduser").dob)}
      Aadhaar  ${this.getLocalStorage("loggeduser").aadhaar}\nDate Of 1st Dose  ${this.toDate(this.getLocalStorage("loggerdata")[0].taken_date)}
      Vaccinated At  ${this.getLocalStorage("loggerdata")[0].city}\nDate Of 2nd Dose  ${this.dosage_2date}\nVaccinated At  ${this.dosage_2city}
      `

  }

}
