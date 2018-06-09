import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FitxaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fitxa',
  templateUrl: 'fitxa.html',
})
export class FitxaPage {
  activity: any;
  user: any;
  ratings: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activity = navParams.get('activity');
    this.user = navParams.get('user');
    this.ratings = this.activity.ratings;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FitxaPage');
  }

}
