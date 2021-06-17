import { ModelsService } from 'src/app/services/models.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  model: any;
  datas: any = [];
  metaList: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    public meta: ModelsService
  ) {
    this.model = this.route.snapshot.params.model;
    // console.log(this.model);
  }

  async ngOnInit() {
    await this.getMeta();
    await this.getData();
  }

  async getMeta() {
    await this.meta
      .getMeta(this.model, 'List')
      .then((res) => {
        this.metaList = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getData() {
    const action = this.model;
    const param = {};
    await this.api
      .list(action, param)
      .then(async (res) => {
        if (res.data) {
          this.datas = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goDetail(id) {
    this.navCtrl.navigateForward([`/detail/${this.model}/${id}`]);
  }
}
