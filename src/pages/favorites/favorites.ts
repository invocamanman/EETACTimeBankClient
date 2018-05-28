import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Activity } from "../../models/activity.model";
import { UserServiceProvider } from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favoritList: Activity[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider) {  }

  ionViewDidLoad() {
    this.favoritList = [
      {
        _id: 'gbr28gh5rqufn2ne0wnf',
        name: 'Test',
        latitude: 41,
        longitude: 4,
        cost: 4,
        user: 'alberti_tu',
        description: 'Test succesful.',
        imatge: '',
        date: '2018-05-28T09:50:42.709Z',
        tags: ['EA', 'minim', '1'],
        category: ['exam', 'programing']
      },
      {
        _id: 'gbu42ng9g54ur2g42rgh',
        name: 'Proba',
        latitude: 41.4,
        longitude: 3.2,
        cost: 2.25,
        user: 'goldenapple',
        description: 'Test passed',
        imatge: '',
        date: '2018-05-28T10:14:42.709Z',
        tags: ['EA', 'minim', '1'],
        category: ['exam', 'programing']
      }
    ];
/*
    this.favoritList = [];
    this.userService.getFavorites(localStorage.getItem('username')).subscribe(data =>{
      this.favoritList = data;
    });
*/
  }

  //Afegir Activitat
  num: number = 1;
  addDommie() {
    let dommie: Activity = {
      _id: 'crtvyb0tbrfg78uogr',
      name: 'Dommie ' + this.num,
      latitude: 41.2,
      longitude: 3.99,
      cost: 10,
      user: 'EETAC',
      description: 'Working Dommie.',
      imatge: '',
      date: '2018-05-28T11:53:42.709Z',
      tags: ['EA', 'minim', '1'],
      category: ['exam', 'programing']
    };

    this.favoritList.push(dommie);

    this.num = this.num + 1;
  }

  // Elimina de la lista de favoritos la actividad seleccionada y actualiza el servidor
  delete(activity: Activity) {
    let tmp: Activity[] = [];
    for (let i in this.favoritList) {
      if(activity !== this.favoritList[i]) {
        tmp.push(this.favoritList[i]);
      }
    }
    this.favoritList = tmp;   // Lista de Favoritos Actualizada
/*
    this.userService.updateFavorites(localStorage.getItem('username'), this.favoritList).subscribe(data => {
      console.log(data);
    });
*/
  }
}
