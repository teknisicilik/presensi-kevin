import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'list/:model',
    loadChildren: () =>
      import('./pages/list/list.module').then((m) => m.ListPageModule),
  },
  {
    path: 'detail/:model/:id',
    loadChildren: () =>
      import('./pages/detail/detail.module').then((m) => m.DetailPageModule),
  },
  // {
  //   path: 'presensi',
  //   loadChildren: () => import('./pages/presensi/presensi.module').then( m => m.PresensiPageModule)
  // },
  {
    path: 'cuti',
    loadChildren: () => import('./pages/cuti/cuti.module').then( m => m.CutiPageModule)
  },
  {
    path: 'cuti-add',
    loadChildren: () => import('./pages/cuti-add/cuti-add.module').then( m => m.CutiAddPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
