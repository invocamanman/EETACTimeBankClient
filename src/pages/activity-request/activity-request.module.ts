import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRequestPage } from './activity-request';

@NgModule({
  declarations: [
    ActivityRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityRequestPage),
  ],
})
export class ActivityRequestPageModule {}
