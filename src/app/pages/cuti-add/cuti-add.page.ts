import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Util } from './../../util';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-cuti-add',
  templateUrl: './cuti-add.page.html',
  styleUrls: ['./cuti-add.page.scss'],
})
export class CutiAddPage implements OnInit {
  cutiForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public util: Util,
    private api: ApiService,
    public modalCtrl: ModalController
  ) {
    this.cutiForm = this.fb.group({
      tanggal_awal: ['', Validators.required],
      tanggal_akhir: ['', Validators.required],
      deskripsi: ['', Validators.nullValidator],
    });
  }

  ngOnInit() {}

  async submit() {
    const form = this.cutiForm.value;

    form.tanggal_awal = moment(
      this.cutiForm.controls.tanggal_awal.value
    ).format('YYYY-MM-DD');

    form.tanggal_akhir = moment(
      this.cutiForm.controls.tanggal_akhir.value
    ).format('YYYY-MM-DD');

    
    const profile = JSON.parse(localStorage.getItem('profile'));
    let karyawan_id = 0;
    if(profile){
      karyawan_id = profile.karyawan_id;
    }

    form.karyawan_id = karyawan_id;
    form.status_verifikasi_id = 1;
    console.log(form);
    //     0: "karyawan_id"
    // 1: "status_verifikasi_id"
    // 2: "tanggal_awal"
    // 3: "tanggal_akhir"
    // 4: "deskripsi"
    // 5: "created_by"
    // 6: "updated_by"
    await this.api
      .add('cuti', {}, form)
      .then((res) => {
        console.log(res);
        if(res){
          this.back();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  back() {
    this.modalCtrl.dismiss();
  }
}
