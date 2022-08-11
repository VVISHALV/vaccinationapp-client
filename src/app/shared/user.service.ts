import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  HOST_ADDRESS = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private route: Router,
    public cookie: CookieService
  ) {}

  registerUser(user: any) {
    return this.http.post(this.HOST_ADDRESS + 'guest/register', user, {withCredentials: true,});
  }
  loginUser(user: any) {
    return this.http.post(this.HOST_ADDRESS + 'guest/login', user, {withCredentials: true,});
  }

  navigate(s: string) {
    this.route.navigate([s]);
  }

  loadUser(user_id: any) {
    return this.http.post(this.HOST_ADDRESS + 'users/loaduser',{user_id: user_id,},{withCredentials: true,});
  }
  getCampAndCities() {
    return this.http.get(this.HOST_ADDRESS + 'guest/getcampandcities', {withCredentials: true,});
  }
  getCities() {
    return this.http.get(this.HOST_ADDRESS + 'guest/getcities', {withCredentials: true,});
  }

  bookSlot(slot: any) {
    return this.http.post(this.HOST_ADDRESS + 'users/bookslot', slot, {withCredentials: true,});
  }
  addCity(city: any) {
    return this.http.post(this.HOST_ADDRESS + 'admin/addcity', city, {withCredentials: true,});
  }

  async storeLoggerData(user_id: any) {
    await this.http.post(this.HOST_ADDRESS + 'users/retrieve',{user_id: user_id,},{ withCredentials: true }).toPromise().then((res) => {
        localStorage.setItem('loggerdata', JSON.stringify(res));
      })
      .catch((error) => {
       // console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }

  updateSlot(updates: any) {
    return this.http.post(this.HOST_ADDRESS + 'admin/updateslot', updates, {withCredentials: true,});
  }

  logout() {
    return this.http.get(this.HOST_ADDRESS + 'guest/logout', {withCredentials: true,});
  }
  refreshToken() {
    return this.http.get(this.HOST_ADDRESS + 'refreshtoken', {withCredentials: true,}); 
  }
  getLocalStorage(key: string) {
    let local: any = localStorage.getItem(key);
    return JSON.parse(local); 
  }
  getUsers() {
    return this.http.get(this.HOST_ADDRESS + 'admin/getusers', {withCredentials: true,});
  }
  approveUser(user_id: any) {
    return this.http.post(
      this.HOST_ADDRESS + 'admin/approveuser',
      { user_id: user_id },
      { withCredentials: true }
    ); 
  }
}
