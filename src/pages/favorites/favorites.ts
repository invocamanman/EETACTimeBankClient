import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Activity } from "../../models/activity.model";
import { UserServiceProvider } from "../../providers/user-service/user-service";

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favoritList: Activity[];
  id: string;
  showData: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private userService: UserServiceProvider) { }

  ionViewDidLoad() { this.select() }

  select(){
    this.showData = false;
    this.favoritList = [];
    this.userService.getProfileUser$(localStorage.getItem('username')).subscribe(data => {
      this.favoritList = data.favorite;
      console.log(this.favoritList);
      this.showData = true;
    });
  }

  // Establece el color del icono Favoritos
  isFavorite(activity: Activity) : boolean {
    for(let i in this.favoritList) {
      if (this.favoritList[i]._id == activity._id) { return true; }
    }
    return false;
  }

  // Lista de Favoritos
  favorite(activity: Activity) {
    let find: boolean = false;
    let send: string[] = this.favoritList.map((object) => {
      if(object._id == activity._id) { find = true; }
      return object._id;
    });

    if(find == false) {
      //Añadimos la actividad a Favoritos
      send.push(activity._id);
      this.favoritList.push(activity);
    } else {
      // Eliminamos la actividad de Favoritos
      let num = this.favoritList.indexOf(activity);
      send.splice(num,1);
      this.favoritList.splice(num,1);
    }

    this.update(send);
  }

  update(send: string[]) {
    this.userService.updateProfileUser$(localStorage.getItem('username'),
      {favorite: send}).subscribe(data => {
      console.log(data);
      if(data.result == 'ERROR') {
        this.ShowMessage(data.result);
      }
    });
  }

  ShowMessage(msg: string) {
    let toast = this.toastCtrl.create({message: msg, duration: 3000});
    toast.present();
  }
}
