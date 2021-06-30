import { Component } from '@angular/core';
import { DataService, Message } from '../../services/data.service';
import {
  ModalController,
  Platform,
  AnimationController,
  NavController,
} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menus: any = [
    {
      name: 'Presensi',
      url: 'presensi',
      icon: 'assets/icon/favicon.png',
      show: true,
    },
    {
      name: 'Karyawan',
      url: 'karyawan',
      icon: 'assets/icon/favicon.png',
      show: false,
    },
    // {
    //   name: 'Divisi',
    //   url: 'divisi',
    //   icon: 'assets/icon/favicon.png',
    //   show: false,
    // },
    {
      name: 'Cuti',
      url: 'cuti',
      icon: 'assets/icon/favicon.png',
      show: true,
    },
  ];
  constructor(
    private data: DataService,
    public platform: Platform,
    public modalCtrl: ModalController,
    public animationCtrl: AnimationController,
    public navCtrl: NavController
  ) {}

  ngOnInit(): void {}

  goList(model) {
    this.navCtrl.navigateForward([`/list/${model}`]);
  }
}
