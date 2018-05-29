import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ActivityRequestResponse } from '../../../models/activityRequestResponse.model';
import { ActivityRequestProvider } from '../../../providers/activity-request/activity-request'
import { RequestDetailPage } from '../request-detail/request-detail';


@IonicPage()
@Component({
  selector: 'page-sortints',
  templateUrl: 'sortints.html',
  entryComponents: []
})
export class SortintsPage {

  sortints: ActivityRequestResponse[];
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private activityRequestProvider: ActivityRequestProvider,
    public modalCtrl: ModalController) {

    this.userId = localStorage['userId'];
    console.log(this.userId);
    
    this.getMyPetitions();
  }

  getMyPetitions()
  {
    this.activityRequestProvider.getMyPetitions(this.userId).subscribe(data => {
      this.sortints = data as ActivityRequestResponse[];
      console.log(data);
    }, error => {
      console.log('uups');
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SortintsPage');
  }

  openDetail(peticion) {
    let modal = this.modalCtrl.create('RequestDetailPage',{peticion: peticion,tipo:"sortint"});
    modal.present();

    modal.onDidDismiss(data=>{
      this.getMyPetitions();
    })
  }

}
