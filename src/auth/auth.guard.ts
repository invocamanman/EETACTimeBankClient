import { Injectable } from '@angular/core';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {NavController} from "ionic-angular";

@Injectable()
export class AuthGuard {

  constructor(

    private authService: AuthServiceProvider) {}

  canActivate() {
    if (!this.authService.isTokenExpired()) {
      return true;
    }

    //this.navCtrl.push('signin');
    return false;
  }

}
