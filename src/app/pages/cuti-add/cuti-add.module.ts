import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CutiAddPageRoutingModule } from './cuti-add-routing.module';

import { CutiAddPage } from './cuti-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CutiAddPageRoutingModule,
  ],
  declarations: [CutiAddPage],
})
export class CutiAddPageModule {}
