import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToRegister(){
    // go to the signin
    this.navCtrl.push('register');
  }

}