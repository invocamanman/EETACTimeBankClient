import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ActivityRequestProvider} from "../../../providers/activity-request/activity-request";

/**
 * Generated class for the ComentariPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentari',
  templateUrl: 'comentari.html',
})
export class ComentariPage {
  activityRequest: any;
  rate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private activityRequestProvider: ActivityRequestProvider) {
    this.activityRequest = navParams.get('item');
    this.rate = navParams.get('rate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentariPage');
  }
  sendRating(comment){
    let rating = {userId: localStorage.getItem('userId'), comment: comment, rate: this.rate};
    this.activityRequestProvider.donePetition(this.activityRequest['_id'],1, rating).subscribe(data=>{
      if(data['message']==='ok') {
        this.activityRequest['isDone'] = true;
        this.navCtrl.push('PeticionsPage');
      }
    })
  }

}
