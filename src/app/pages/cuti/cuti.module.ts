import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CutiPageRoutingModule } from './cuti-routing.module';

import { CutiPage } from './cuti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CutiPageRoutingModule,
  ],
  declarations: [CutiPage],
})
export class CutiPageModule {}
