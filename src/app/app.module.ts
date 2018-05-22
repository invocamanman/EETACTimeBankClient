import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//per les imatges
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {Camera} from "@ionic-native/camera";

import { MyApp } from './app.component';
//providers
import { UserServiceProvider } from '../providers/user-service/user-service';
import {ActivityServiceProvider} from '../providers/activity-service/activity-service';
import { FileServiceProvider } from '../providers/file-service/file-service';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';
import { APIInterceptor } from '../interceptors/api.interceptor';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {ChatServiceProvider} from '../providers/chat-service/chat-service';
//pages
import { HomePage }           from '../pages/home/home';
import {ProfilePage}          from "../pages/profile/profile";
import {ActivityRequestPage}  from "../pages/activity-request/activity-request";
import {BancPage}             from "../pages/banc/banc";
import {MessagesPage}         from "../pages/messages/messages";
import {ImageuploadPage} from "../pages/imageupload/imageupload";
import {ChatPage} from "../pages/chat/chat";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    ActivityRequestPage,
    BancPage,
    MessagesPage,
    ImageuploadPage,
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
    ImageuploadPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,  FileTransferObject, File, Camera,
    AuthGuard,
    AuthServiceProvider, {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,

    },
    UserServiceProvider,
    AuthServiceProvider,
    ActivityServiceProvider,
    FileServiceProvider,
    ChatServiceProvider
  ]
})
export class AppModule {}
