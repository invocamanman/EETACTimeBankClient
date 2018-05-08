import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'signin'
})
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [UserServiceProvider],
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider) {
  }

  signIn(username: string, password: string) {
    this.userService.signIn$(username, password).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
      },
      data => {
        console.log(data);
      });
  }
  goToRegister(){
    // go to the signin
    this.navCtrl.push('register');
  }


}
