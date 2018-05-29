import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ActivityRequestResponse } from '../../../models/activityRequestResponse.model';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivityRequestProvider } from '../../../providers/activity-request/activity-request';
import { ActionSheetController } from 'ionic-angular';


/**
 * Generated class for the RequestDetailPage page.
 *
 * See https://ionic
 * framework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-detail',
  templateUrl: 'request-detail.html',
})
export class RequestDetailPage {
  peticio: ActivityRequestResponse;

  color: string[];

  tipo: string;

  constructor(private view: ViewController, public navParams: NavParams,
    private activityRequestProvider: ActivityRequestProvider, public actionSheetCtrl: ActionSheetController) {
    this.peticio = this.navParams.get('peticion');
    this.tipo = this.navParams.get('tipo');
    console.log(this.peticio);
    console.log(this.tipo);
    this.color = ["red", "green", "blue", "yellow", "orange", "brown", "gold", "greenYellow", "hotpink", "lavender", "magenta"]
  }

  getColor(name: string): string {
    return this.color[parseInt(Md5.hashStr(name).toString()) % 11];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDetailPage');
  }

  deleteReq()
  {
    this.activityRequestProvider.deletePetition(this.peticio['_id']).subscribe(data=>{
        this.view.dismiss();
    });
  }

  accept(){
    this.activityRequestProvider.acceptPetition(this.peticio['_id']).subscribe(data=>{
      if(data['message']==='ok')
        this.peticio['accepted']=true;
    });
  }

  closeModal() {
    this.view.dismiss();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Puntua la Activitat',
      buttons: [
        {
          text: '1 Estrella',
          handler: () => {
            this.activityRequestProvider.donePetition(this.peticio['_id'],1).subscribe(data=>{
              if(data['message']==='ok')
              this.peticio['isDone']=true;
            })
          }
        }, {
          text: '2 Estrellas',
          handler: () => {
            this.activityRequestProvider.donePetition(this.peticio['_id'],2).subscribe(data=>{
              if(data['message']==='ok')
              this.peticio['isDone']=true;
            })
          }
        }, {
          text: '3 Estrellas',
          handler: () => {
            this.activityRequestProvider.donePetition(this.peticio['_id'],3).subscribe(data=>{
              if(data['message']==='ok')
              this.peticio['isDone']=true;
            })
          }
        }, {
          text: '4 Estrellas',
          handler: () => {
            this.activityRequestProvider.donePetition(this.peticio['_id'],4).subscribe(data=>{
              if(data['message']==='ok')
              this.peticio['isDone']=true;
            })
          }
        }, {
          text: '5 Estrellas',
          handler: () => {
            this.activityRequestProvider.donePetition(this.peticio['_id'],5).subscribe(data=>{
              if(data['message']==='ok')
              this.peticio['isDone']=true;
            })
          }
        }
      ]
    });
    actionSheet.present();
  }

}
