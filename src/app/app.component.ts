import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { MainpagePage} from "../pages/mainpage/mainpage";
import {PeticionsPage} from '../pages/peticions/peticions';
import {BancPage} from '../pages/banc/banc'
import {MessagesPage} from '../pages/messages/messages'
import {ChatPage} from "../pages/chat/chat";
import {FavoritesPage} from "../pages/favorites/favorites";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  username:String;
  rootPage:any = HomePage;

  foto:String='assets/imgs/logo.png';
  pages: Array<{title: string, component: any, icon: string}>;



  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, public events: Events) {
    platform.ready().then(() => {
      this.username = localStorage.getItem('username');

      events.subscribe('user:created', (username) => {
        this.username=username;
      });

      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [
        { title: 'Pagina Principal', component: MainpagePage, icon: 'home'},
        { title: 'Perfil', component: ProfilePage, icon: 'contact'},
        { title: 'ChatsActuals',component:ChatPage,icon:'mail'},
        { title: 'Missatges' , component: MessagesPage, icon: 'mail'},
        { title: 'Favorits', component: FavoritesPage, icon: 'heart'},
        { title: 'Banc' , component: BancPage, icon: 'cash'},
        { title: 'Peticions' , component: PeticionsPage, icon: 'notifications'},
        { title: 'Exit', component: HomePage, icon: 'exit' }
      ];
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

