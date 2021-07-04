import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CutiDetailPage } from './cuti-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CutiDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CutiDetailPageRoutingModule {}
