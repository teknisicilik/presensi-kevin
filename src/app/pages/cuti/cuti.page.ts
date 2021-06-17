import { CutiAddPage } from './../cuti-add/cuti-add.page';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cuti',
  templateUrl: './cuti.page.html',
  styleUrls: ['./cuti.page.scss'],
})
export class CutiPage implements OnInit {
  cutis: any = [];
  constructor(
    private api: ApiService,
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getData();
  }

  async getData() {
    const action = 'cuti';
    const param = {};
    await this.api
      .list(action, param)
      .then((res) => {
        if (res.data) {
          this.cutis = res.data;
          console.log(this.cutis);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async onClick() {
    const modal = await this.modalCtrl.create({
      component: CutiAddPage,
      componentProps: {},
    });

    modal.onDidDismiss().then(async (dataReturned) => {
      await this.getData();
      if (dataReturned !== null) {
        console.log(dataReturned);
      }
    });

    return await modal.present();
  }

  formatTanggal(tanggal) {
    return moment(tanggal).locale('id').format('DD MMMM YYYY');
  }

  logOut() {
    localStorage.clear();
    this.navCtrl.navigateRoot(['/login']);
  }
}
