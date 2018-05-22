import { Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
//models
import {Activity} from "../../models/activity.model";
import {User} from "../../models/user.model";
import {ActivityRequest} from "../../models/activityRequest.model";

import {ImageuploadPageModule} from '../imageupload/imageupload.module'
//providers
import {ActivityServiceProvider} from "../../providers/activity-service/activity-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

import {ISubscription} from "rxjs/Subscription";
import {ImageuploadPage} from "../imageupload/imageupload";



/**
 * Generated class for the MainpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'mainpage'
})
@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html',
  providers: [ ActivityServiceProvider]

})
export class MainpagePage implements OnInit, OnDestroy {

  showModalUser: boolean;
  showModalActivity: boolean;
  showModalPetition: boolean;

  activity: Activity;
  novetats: any;
  activitySelect: Activity;
  activityRequest: ActivityRequest;
  user: User;

  latitud_map: number;
  longitud_map: number;
  latitud_marker_user: number;
  longitud_marker_user: number;
  latitud_marker_activity: number;
  longitud_marker_activity: number;
  showMap: boolean;
  activityNotifSubs: ISubscription;
  @ViewChild('activityimage') imageUploader: ImageuploadPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public activityService: ActivityServiceProvider,
              private userService: UserServiceProvider, formBuilder: FormBuilder) {

    this.activity = new Activity('', 41.275443, 1.98665, 0, localStorage.username, '', '');
    this.showMap = false;
    this.showModalUser = false;
    this.showModalActivity = false;
    this.showModalPetition = false;
  }
  ngOnDestroy() {
    //this.activityNotifSubs.unsubscribe();
  }
  ngOnInit() {
    this.activityService.getActivityAll().subscribe(
      response => {
        if (response) {
          this.novetats = response; // Retorna totes les activitats
          console.log(this.novetats);
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  addTag(tag: string) { this.activity.tags.push(tag); }

  // Mostra el modal d'un usuari
  veurePerfil(name: string) {
    this.showModalUser = false;
    this.userService.getProfileUser$(name).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.showModalUser = true;
  }

  // Mostra el modal de una Activitat
  getActivity(activity: Activity) {
    this.showModalActivity = false;
    this.activitySelect = activity;
    console.log(this.activitySelect);

    // Prepara el mapa
    this.showMap = false;
    this.latitud_map = this.activitySelect.latitude;
    this.longitud_map = this.activitySelect.longitude;
    this.latitud_marker_activity = this.activitySelect.latitude;
    this.longitud_marker_activity = this.activitySelect.longitude;

    // Posición del Usuario
    const self = this;
    if (navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Devuelve los valores del CallBack
        self.latitud_marker_user = position.coords.latitude;
        self.longitud_marker_user = position.coords.longitude;
        self.showMap = true;
      });
    } else { console.error('Error: No se puede acceder a la localización'); }
    this.showModalActivity = true;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MainpagePage');

    this.activityService.getActivityAll().subscribe(
      response => {
        if (response) {
          console.log(response);
          this.novetats = response;


        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  makeApetition(ToName, idActivity) {
    this.activityRequest = new ActivityRequest(localStorage.username, ToName, idActivity, false, null, null);
    this.sendAPetition(this.activityRequest);
  }

  sendAPetition(activityRequest) {
    console.log(this.activityRequest);
    this.activityService.makeApetition(this.activityRequest).subscribe(
      response => {
        if (response) {
         // this.toastr.success('Has enviat una peticio per fer una activitat', 'Nova petició de Activitat');
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit() {
    console.log(this.activity);
    //if (this.imageUploader.imageId) {this.activity['imatge'] = this.imageUploader.imageId; }
    this.activityService.newActivity(this.activity).subscribe(
      response => {
        if (response) {
          console.log(response);
          //this.imageUploader.reset();
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }



}
