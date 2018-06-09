import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentariPage } from './comentari';
import {RequestDetailPage} from "../request-detail/request-detail";

@NgModule({
  declarations: [
    ComentariPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentariPage),
  ],
  exports: [
    ComentariPage,
]
})
export class ComentariPageModule {}
