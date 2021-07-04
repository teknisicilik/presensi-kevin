import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-cuti-detail',
  templateUrl: './cuti-detail.page.html',
  styleUrls: ['./cuti-detail.page.scss'],
})
export class CutiDetailPage implements OnInit {
  data: any;
  id: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getParam();
    this.getData();
  }

  getParam() {
    this.route.params.subscribe((p) => {
      this.id = p.id;
    });
  }

  async getData() {
    const action = `cuti/${this.id}`;
    const param = {};
    await this.api
      .detail(action, param)
      .then((res) => {
        if (res) {
          this.data = res;
          console.log(this.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formatTanggal(tanggal) {
    return moment(tanggal).locale('id').format('DD MMMM YYYY');
  }
}
