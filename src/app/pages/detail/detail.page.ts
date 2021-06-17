import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModelsService } from 'src/app/services/models.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  model: any;
  id: any;
  data: any;
  metas: any;

  constructor(
    private api: ApiService,
    public meta: ModelsService,
    private route: ActivatedRoute,
    public navCtrl: NavController
  ) {
    this.model = this.route.snapshot.params.model;
    this.id = this.route.snapshot.params.id;
  }

  async ngOnInit() {
    await this.getMeta();
    await this.getData();
    this.showData();
  }

  async getMeta() {
    // this.metas = await this.meta.getModel(this.model);
    console.log('Meta : ', this.metas);
  }

  async getData() {
    let action = `${this.model}/${this.id}`;
    let param = {};
    await this.api
      .detail(action, param)
      .then((res) => {
        // console.log(res);
        if (res) {
          this.data = res;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async showData() {
    let data = [];
    for (const key in this.data) {
      // console.log(`${key}: ${this.data[key]}`);
      this.metas.field.find((meta) => {
        let tmp_data = {};
        // let a = meta == key;
        // console.log(meta.name);
        // console.log(meta[key]);
        if (meta.name == key && meta.view) {
          // console.log(`${key}: ${this.data[key]}`);
          // let new_data = JSON.stringify(`{${key}: ${this.data[key]}}`);
          tmp_data['label'] = meta.label;
          tmp_data['value'] = this.data[key];
          if (meta.relation) {
            tmp_data['label'] = this.convertKey(meta.relation_display + '_' + meta.relation_table);
            tmp_data['value'] = this.data[meta.relation_display + '_' + meta.relation_table];
            data.push(tmp_data);
          }else{
            data.push(tmp_data);
          }


          
        }
        
      });
    }
    this.data = data;
    console.log('Datasss : ', data);
  }

  convertKey(key) {
    return key.replace(/_/g, ' ');
  }
}
