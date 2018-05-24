import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ActivityRequest} from "../../models/activityRequest.model";
import {ActivityRequestService} from "../../providers/activity-request-service/activity-request.service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the BancPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-banc',
  templateUrl: 'banc.html',
})
export class BancPage {
  SearchDone = false;
  myActivitiesList: Array<ActivityRequest> = [];
  theirActivitiesList: Array<ActivityRequest> = [];
  user = {username: '', wallet: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private activityRequestService: ActivityRequestService, private userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BancPage');
    this.getDoneActivities();
    this.getWallet();
  }

  getDoneActivities() {
    const id = localStorage.getItem('userId');
    this.activityRequestService.getMyPetitions(id).subscribe(
      data => {
        const da: any = data;
        this.myActivitiesList = da;
        this.SearchDone = true;
        console.log(this.myActivitiesList);
      }
    );
    this.activityRequestService.getTheirPetitions(id).subscribe(
      data => {
        const da2: any = data;
        this.theirActivitiesList = da2;
        this.SearchDone = true;
        console.log(this.theirActivitiesList);
      }
    );
  }
  getWallet() {
    const id = localStorage.getItem('userId');
    this.userService.getUserWallet(id).subscribe(
      data => {
        this.user = data;
        console.log(data);
      },
      data => {
        console.error(data);
      });
  }
}
