import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'home',
      //   loadChildren: () =>
      //     import('../pages/home/home.module').then((m) => m.HomePageModule),
      // },
      {
        path: 'presensi',
        loadChildren: () =>
          import('../pages/presensi/presensi.module').then(
            (m) => m.PresensiPageModule
          ),
      },
      {
        path: 'cuti',
        loadChildren: () =>
          import('../pages/cuti/cuti.module').then((m) => m.CutiPageModule),
      },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('../pages/profile/profile.module').then(
      //       (m) => m.ProfilePageModule
      //     ),
      // },
      {
        path: '',
        redirectTo: '/tabs/presensi',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/presensi',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
