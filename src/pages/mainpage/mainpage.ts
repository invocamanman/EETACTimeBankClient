import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

/**
 * Generated class for the MainpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'mainpage'
})
@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html',
})
export class MainpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

    let toast = this.toastCtrl.create({
      message: 'Welcome ' + localStorage.getItem('userId'),
      duration: 3000
    });
    toast.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainpagePage');
  }


}
