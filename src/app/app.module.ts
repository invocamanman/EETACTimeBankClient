import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//providers
import { UserServiceProvider } from '../providers/user-service/user-service';
import {ActivityServiceProvider} from '../providers/activity-service/activity-service';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';
import { APIInterceptor } from '../interceptors/api.interceptor';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

//pages
import { HomePage }           from '../pages/home/home';
import {ProfilePage}          from "../pages/profile/profile";
import {ActivityRequestPage}  from "../pages/activity-request/activity-request";
import {BancPage}             from "../pages/banc/banc";
import {MessagesPage}         from "../pages/messages/messages";
import {ChatPage} from "../pages/chat/chat";
import { ChatServiceProvider } from '../providers/chat-service/chat-service';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    ActivityRequestPage,
    BancPage,
    MessagesPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    ActivityRequestPage,
    BancPage,
    MessagesPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthGuard,
    AuthServiceProvider, {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    UserServiceProvider,
    AuthServiceProvider,
    ActivityServiceProvider,
    ChatServiceProvider
  ]
})
export class AppModule {}
