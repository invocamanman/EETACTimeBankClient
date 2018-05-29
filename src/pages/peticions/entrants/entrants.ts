import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ActivityRequestResponse } from '../../../models/activityRequestResponse.model';
import { ActivityRequestProvider } from '../../../providers/activity-request/activity-request'


/**
 * Generated class for the EntrantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entrants',
  templateUrl: 'entrants.html',
})
export class EntrantsPage {

  entrants: ActivityRequestResponse[];
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private activityRequestProvider: ActivityRequestProvider,
    public modalCtrl: ModalController) {

    this.userId = localStorage['userId'];
    console.log(this.userId);
    
    this.getTheirPetitions();
  }

  getTheirPetitions()
  {
    this.activityRequestProvider.getTheirPetitions(this.userId).subscribe(data => {
      this.entrants = data as ActivityRequestResponse[];
      console.log(data);
    }, error => {
      console.log('uups');
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrantsPage');
  }

  openDetail(peticion) {
    let modal = this.modalCtrl.create('RequestDetailPage',{peticion: peticion,tipo:"entrant"});
    modal.present();

    modal.onDidDismiss(data=>{
      this.getTheirPetitions();
    })
  }

}
