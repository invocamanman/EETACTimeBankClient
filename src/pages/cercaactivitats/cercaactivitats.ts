import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ActivityServiceProvider} from "../../providers/activity-service/activity-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { Activity } from '../../models/activity.model';
/**
 * Generated class for the CercaactivitatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cercaactivitats',
  templateUrl: 'cercaactivitats.html',
})
export class CercaactivitatsPage {
  //options123: number;
  Activitylist: Activity[];
  distance:number;
  price:number;
  useprice:boolean;
  pricebuscador:number;
  latitude:number;
  longitude:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, private activityservice: ActivityServiceProvider) {

    //this.options123=4;
    this.distance = 4;
    this.price=5;
    this.latitude=41.414578;
    this.longitude=2.179301;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CercaactivitatsPage');
    this.Filtrar("");
  }
  Filtrar(buscador){
    console.log(buscador);
    if(this.useprice)
    {
      this.pricebuscador=this.price;
    }
    else{
      this.pricebuscador=10;
    }
    this.activityservice.filtrarpornombre$(buscador,this.pricebuscador,this.distance, this.latitude,this.longitude).subscribe(
      data => {
        console.log(data);
        this.Activitylist = data;
      }
    );
    /*
    if (this.options123==1)
    {
      this.BuscaCategories(buscador);
    }
    else if (this.options123==2)
    {
      this.BuscaTags(buscador);
    }
    else if (this.options123==3)
    {
      this.BuscaPreu(buscador);
    }
    else if (this.options123==4)
    {
      this.BuscaNom(buscador);
    }
    else if (this.options123==5)
    {
      this.BuscaGPS(buscador);
    }
    */
  }

  getItems(ev: any) {
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    this.Filtrar(val);
  }

  BuscaCategories(categoria){

  }
  BuscaTags(tag){

  }
  BuscaPreu(preu){

  }
  BuscaNom(nom){


  }
  BuscaGPS(coordenada){

  }

}
