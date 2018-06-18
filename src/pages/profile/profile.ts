import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { HttpErrorResponse } from "@angular/common/http";
import { User } from '../../models/user.model';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';
import { Activity } from '../../models/activity.model';
import {ChatPage} from "../chat/chat";

@IonicPage({
  name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;
  activitySelected: Activity;
  showProfile: boolean;
  showView: boolean;
  showEdit: boolean;
  showMap: boolean;
  tagString: string;
  first: boolean;
  latitud_map: number;
  longitud_map: number;
  latitud_marker_user: number;
  longitud_marker_user: number;
  latitud_marker_activity: number;
  longitud_marker_activity: number;
  username: string;
  owner: boolean;
  userForeign: string;
  shRating;
  favoritList: Activity[];

  fullstar = '../../../assets/img/star-full.png';
  star = '../../../assets/img/star.png';
  star1img = this.fullstar;
  star2img = this.star;
  star3img = this.star;
  star4img = this.star;
  star5img = this.star;


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private userService: UserServiceProvider,
              private activityService: ActivityServiceProvider) {
    this.showProfile = false;
    this.showView = false;
    this.showEdit = false;
    this.showMap = false;
    this.tagString = '';
    this.username = localStorage.getItem('username');
  }

  ionViewDidLoad() {
    this.connect(localStorage.getItem('username'), true);
    this.userService.Owner.subscribe((currentOwner) => {
      if(currentOwner){this.username = currentOwner.username;}
    });
  }

  // Recibe la respuesta del servidor
  connect(user: string, owner: boolean) {
    this.showProfile = false;
    this.owner = owner;
    if (owner === false) { this.userForeign = user; }
    this.userService.getProfileUser$(user).subscribe(
      data => {
        this.user = data;
        this.shRating = this.user.rating.toFixed(2);
        this.userService.Owner.next(data);
        // El JSON se guarda en user
        console.log(this.user);
        this.showProfile = true;      // Mostramos el resultado
        this.setStars(data.rating);
        this.favoritList = this.user.favorite;
        this.showProfile = true;      // Mostramos el resultado
      },
      (err: HttpErrorResponse) => { console.log(err.error); }
    );
  }

  popupView(activity) {
    this.showView = false;
    this.activitySelected = activity;
    this.showView = true;

    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = this.activitySelected.latitude;
    this.longitud_map = this.activitySelected.longitude;
    this.latitud_marker_activity = this.activitySelected.latitude;
    this.longitud_marker_activity = this.activitySelected.longitude;

    this.setUpPosicion(); // Coloca la posicion del usuario
  }

  popupEdit(activity) {
    this.showEdit = false;
    this.activitySelected = activity;
    this.showEdit = true;

    // Prepara el input de tags
    this.first = true;
    for (const tags of this.activitySelected.tags) {
      if (this.first === true) {
        this.tagString = tags;
        this.first = false;
      } else {
        this.tagString = this.tagString + ', ' + tags;
      }
    }

    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = this.activitySelected.latitude;
    this.longitud_map = this.activitySelected.longitude;
    this.latitud_marker_activity = this.activitySelected.latitude;
    this.longitud_marker_activity = this.activitySelected.longitude;

    this.setUpPosicion(); // Coloca la posicion del usuario
  }

  editActivity(name, cost, description, tag, latitude, longitude) {
    const tags: string[] = tag.value.split(', '); // Prepara la lista de Tags
    const json = {
      name: name.value,
      cost: cost.value,
      description: description.value,
      latitude: latitude,
      longitude: longitude,
      tags: tags
    };

    console.log(json); // Body de la petición PUT

    this.activityService.updateActivity(this.activitySelected._id, json).subscribe(data => {
      console.log(data);
      if (data.result === 'ACTUALIZADO') {
        // $('#editActivity').modal('hide');   // Cierra el modal
      }
    });
  }

  popupReservation(activity) { console.log('Reservar ' + activity.name); }

  addChat() {
    const json = {
      user1: localStorage.getItem('username'),
      user2: this.userForeign
    };

    this.userService.addchat$(json).subscribe(status => {
      if (status.status != null && status.status === 'ok' && status.chatId) {
        // this.router.navigate(['/messages'], { queryParams: { chatId: status.chatId }});
        this.navCtrl.setRoot('ChatPage')
      }
    });
  }

  // Establece el color del icono Favoritos
  isFavorite(activity: Activity) : boolean {
    for(let i in this.favoritList) {
      if (this.favoritList[i]._id == activity._id) { return true; }
    }
    return false;
  }

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


  /*******************  MAPAS  *******************/

  // Inicializa el mapa y el marcador
  setUpPosicion() {
    const self = this;
    if (navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Devuelve los valores del CallBack
        self.latitud_marker_user = position.coords.latitude;
        self.longitud_marker_user = position.coords.longitude;
        self.showMap = true;
      });
    } else { console.error('Error: No se puede acceder a la localización'); }
  }

  // Obtiene las coordenadas del nuevo marker
  mapClick(event) {
    this.latitud_marker_activity = event.coords.lat;
    this.longitud_marker_activity = event.coords.lng;
  }
  /*Minim2 modificar l'usuari*/
  goToModify(){
    this.navCtrl.push('modifyProfile');

  }

  setStars(num: number) {
    num = Math.round(num);
    console.log(num);
    switch (num) {
      case 1:
        this.star1img = this.fullstar;
        this.star2img = this.star;
        this.star3img = this.star;
        this.star4img = this.star;
        this.star5img = this.star;
        break;
      case 2:
        this.star1img = this.fullstar;
        this.star2img = this.fullstar;
        this.star3img = this.star;
        this.star4img = this.star;
        this.star5img = this.star;
        break;
      case 3:
        this.star1img = this.fullstar;
        this.star2img = this.fullstar;
        this.star3img = this.fullstar;
        this.star4img = this.star;
        this.star5img = this.star;
        break;
      case 4:
        this.star1img = this.fullstar;
        this.star2img = this.fullstar;
        this.star3img = this.fullstar;
        this.star4img = this.fullstar;
        this.star5img = this.star;
        break;
      case 5:
        this.star1img = this.fullstar;
        this.star2img = this.fullstar;
        this.star3img = this.fullstar;
        this.star4img = this.fullstar;
        this.star5img = this.fullstar;
        break;
    }
  }
  fitxa(activity, user) {
    this.navCtrl.push('FitxaPage', {
      activity: activity,
      user: user
    });
  }
}
