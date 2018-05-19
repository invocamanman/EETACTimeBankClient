import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BancPage } from './banc';

@NgModule({
  declarations: [
    BancPage,
  ],
  imports: [
    IonicPageModule.forChild(BancPage),
  ],
})
export class BancPageModule {}
