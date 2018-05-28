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

  addDommie() {
    let send: string[] = [];
    for (let i in this.favoritList) { send.push(this.favoritList[i]._id); }
    send.push(this.id);

    this.update(send);
    this.select();
  }

  select(){
    this.showData = false;
    this.favoritList = [];
    this.userService.getProfileUser$(localStorage.getItem('username')).subscribe(data => {
      this.favoritList = data.favorite;
      console.log(this.favoritList);
      this.showData = true;
    });
  }

  update(send: string[]) {
    this.userService.updateProfileUser$(localStorage.getItem('username'),
      {favorite: send}).subscribe(data => {
      console.log(data);
      this.ShowMessage(data.result);
    });
  }

  delete(activity: Activity) {
    let tmp: Activity[] = [];
    let send: string[] = [];

    for (let i in this.favoritList) {
      if (activity !== this.favoritList[i]) {
        tmp.push(this.favoritList[i]);
        send.push(this.favoritList[i]._id);
      }
    }
    this.favoritList = tmp;   // Lista de Favoritos Actualizada

    this.update(send);
  }

  ShowMessage(msg: string) {
    let toast = this.toastCtrl.create({message: msg, duration: 3000});
    toast.present();
  }
}
