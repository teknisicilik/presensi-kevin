/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { NavController } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Util {
  isLogin: boolean = false;

  constructor(private api: ApiService, private navCtrl: NavController) {}

  async cekLogin() {
    let token = localStorage.getItem('token');
    if (token) {
      await this.cekProfile();
    }

    if (!this.isLogin) {
      localStorage.clear();
      this.navCtrl.navigateRoot(['/login']);
    }
  }

  private async cekProfile() {
    let action = 'me';
    let param = {};
    await this.api
      .get(action, param)
      .then((res) => {
        this.isLogin = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public CurrentUserId() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const id = profile.id;
    if (id) {
      return id;
    } else {
      return 0;
    }
  }
}
