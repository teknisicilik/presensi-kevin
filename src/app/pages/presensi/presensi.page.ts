import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-presensi',
  templateUrl: './presensi.page.html',
  styleUrls: ['./presensi.page.scss'],
})
export class PresensiPage implements OnInit {
  presensis: any = [];

  tanggal_sekarang = moment(new Date()).locale('id').format('YYYY-MM-DD');
  status_presensi: any;
  constructor(private api: ApiService, public navCtrl: NavController) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    await this.getData();
    this.cekPresensi();
  }

  async getData() {
    const action = 'presensi';
    const param = {};
    await this.api
      .list(action, param)
      .then((res) => {
        if (res.data) {
          this.presensis = res.data;
          console.log("presensi lis :",this.presensis);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  formatTanggal(tanggal) {
    return moment(tanggal).locale('id').format('DD MMMM YYYY');
  }

  logOut() {
    localStorage.clear();
    this.navCtrl.navigateRoot(['/login']);
  }
}
