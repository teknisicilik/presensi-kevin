import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CutiAddPage } from './cuti-add.page';

const routes: Routes = [
  {
    path: '',
    component: CutiAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CutiAddPageRoutingModule {}
