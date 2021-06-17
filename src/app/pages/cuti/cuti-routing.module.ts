import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CutiPage } from './cuti.page';

const routes: Routes = [
  {
    path: '',
    component: CutiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CutiPageRoutingModule {}
