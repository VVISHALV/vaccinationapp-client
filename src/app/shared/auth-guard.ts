import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let userInfo = this.auth.getLocalStorage('loggeduser');

    if (route.data['userType'] === 'user-logged-in') {
      if (userInfo != undefined && userInfo.priviledge == 0) {
        return true;
      }
      if (userInfo != undefined && userInfo.priviledge == 1) {
        this.auth.navigate('/admin');
        return false;
      }
      if (userInfo != undefined && userInfo.priviledge == 2) {
        this.auth.navigate('/medico');
        return false;
      }

      this.auth.navigate('/login');
      return false;
    } else if (route.data['userType'] === 'non-logged-in') {
      if (userInfo == undefined) {
        return true;
      }
      if (userInfo.priviledge == 0) {
        this.auth.navigate('/home');
        return false;
      }
      if (userInfo.priviledge == 1) {
        this.auth.navigate('/admin');
        return false;
      }
      if (userInfo.priviledge == 2) {
        this.auth.navigate('/medico');
        return false;
      }
    } else if (route.data['userType'] === 'admin-logged-in') {
      if (userInfo != undefined && userInfo.priviledge == 1) {
        return true;
      }
      this.auth.navigate('/login');
      return false;
    } else if (route.data['userType'] === 'medico-logged-in') {
      if (userInfo != undefined && userInfo.priviledge == 2) {
        return true;
      }
      this.auth.navigate('/login');
      return false;
    }
    this.auth.navigate('/');
    return false;
  }
}
