import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeticionsPage } from './peticions';

@NgModule({
  declarations: [
    PeticionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PeticionsPage),
  ]
})
export class PeticionsPageModule {}
