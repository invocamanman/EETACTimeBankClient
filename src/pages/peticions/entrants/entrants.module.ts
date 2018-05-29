import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntrantsPage } from './entrants';

@NgModule({
  declarations: [
    EntrantsPage,
  ],
  imports: [
    IonicPageModule.forChild(EntrantsPage),
  ],
})
export class EntrantsPageModule {}
