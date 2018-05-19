import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

//providers
import {ActivityServiceProvider} from "../../providers/activity-service/activity-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public activityService: ActivityServiceProvider) {

    let toast = this.toastCtrl.create({
      message: 'Welcome ' + localStorage.getItem('userId'),
      duration: 3000
    });
    toast.present();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainpagePage');

    this.activityService.getActivityAll().subscribe(
      response => {
        if (response) {
          console.log(response);

        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


}
