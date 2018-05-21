import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { MainpagePage} from "../pages/mainpage/mainpage";
import {ActivityRequestPage} from '../pages/activity-request/activity-request';
import {BancPage} from '../pages/banc/banc'
import {MessagesPage} from '../pages/messages/messages'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage:any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [
        { title: 'Pagina Principal', component: MainpagePage, icon: 'home'},
        { title: 'Perfil', component: ProfilePage, icon: 'contact'},
        { title: 'Missatges' , component: MessagesPage, icon: 'mail'},
        { title: 'Banc' , component: BancPage, icon: 'cash'},
        { title: 'Peticions' , component: ActivityRequestPage, icon: 'notifications'},
        { title: 'Exit', component: HomePage, icon: 'exit' }

      ];
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}

