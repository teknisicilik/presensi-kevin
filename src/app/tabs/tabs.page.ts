import { ApiService } from 'src/app/services/api.service';
import { NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  Platform,
  AnimationController,
  NavController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  status_presensi: any;

  tanggal_sekarang = moment(new Date()).locale('id').format('YYYY-MM-DD');
  jam_sekarang = moment(new Date()).locale('id').format('HH:mm');

  constructor(
    private api: ApiService,
    public modalCtrl: ModalController,
    public animationCtrl: AnimationController,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.cekPresensi();
  }

  async cekPresensi() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    let karyawan_id = 0;
    if (profile) {
      karyawan_id = profile.karyawan_id;
    }
    const action = 'custom/cekpresensi';
    const param = {
      karyawan_id: karyawan_id,
      tanggal: this.tanggal_sekarang,
    };
    await this.api
      .get(action, param)
      .then((res) => {
        console.log('Cek presensi : ', res);
        if (res) {
          this.status_presensi = res;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async presensi() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      mode: 'ios',
    });
    await loading.present();

    const profile = JSON.parse(localStorage.getItem('profile'));
    let karyawan_id = 0;
    if (profile) {
      karyawan_id = profile.karyawan_id;
    }
    const action = 'custom/presensiadd';
    let param = {};
    const body = {
      karyawan_id: karyawan_id,
      tanggal: this.tanggal_sekarang,
      jam: this.jam_sekarang,
    };
    await this.api
      .post(action, param, body)
      .then((res) => {
        loading.dismiss();
        console.log('Add presensi : ', res);
        if (res) {
          this.presentToast(res.message, 'success');
          // this.status_presensi = res;
        }
      })
      .catch((err) => {
        this.presentToast('Presensi gagal', 'danger');
        loading.dismiss();
        console.log(err);
      });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      mode: 'ios',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.presentToast('Presensi berhasil', 'success');
  }

  async presentToast(text, color) {
    const toast = await this.toastController.create({
      message: `${text}`,
      duration: 2000,
      color: `${color}`,
      mode: 'md',
      position: 'middle',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark',
          cssClass: 'icon-berhasil',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        // {
        //   text: 'Done',
        //   role: 'cancel',
        //   handler: () => {
        //     console.log('Cancel clicked');
        //   },
        // },
      ],
    });
    toast.present();
  }
}
