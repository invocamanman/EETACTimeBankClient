import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentariPage } from './comentari';

@NgModule({
  declarations: [
    ComentariPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentariPage),
  ],
})
export class ComentariPageModule {}
