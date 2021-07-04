import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CutiDetailPageRoutingModule } from './cuti-detail-routing.module';

import { CutiDetailPage } from './cuti-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CutiDetailPageRoutingModule
  ],
  declarations: [CutiDetailPage]
})
export class CutiDetailPageModule {}
