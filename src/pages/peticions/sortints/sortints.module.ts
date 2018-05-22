import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SortintsPage } from './sortints';
import { RequestDetailPage } from "../request-detail/request-detail";


@NgModule({
  declarations: [
    SortintsPage,
  ],
  imports: [
    IonicPageModule.forChild(SortintsPage),
  ],
})
export class SortintsPageModule {}
