import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the PeticionsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-peticions',
  templateUrl: 'peticions.html'
})
export class PeticionsPage {

  entrantsRoot = 'EntrantsPage'
  sortintsRoot = 'SortintsPage'


  constructor(public navCtrl: NavController) {
  }

}
