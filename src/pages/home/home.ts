import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

    }
  goTosignin(){
    // go to the signin
    this.navCtrl.push('signin');
  }
  goToRegister(){
    // go to the signin
    this.navCtrl.push('register');
  }

}
