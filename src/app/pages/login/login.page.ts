import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelsService } from 'src/app/services/models.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  passwordType = 'password';
  iconType = 'eye-outline';
  showPassword: boolean = false;

  constructor(
    public fb: FormBuilder,
    private api: ApiService,
    public model: ModelsService,
    private navCtrl: NavController,
    public toastController: ToastController
  ) // public loading : LoaderService,
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  showHidePassword() {
    if (!this.showPassword) {
      this.showPassword = true;
      this.passwordType = 'text';
      this.iconType = 'eye-off-outline';
    } else {
      this.showPassword = false;
      this.passwordType = 'password';
      this.iconType = 'eye-outline';
    }
  }

  async login() {
    // let data = {};
    let data = this.loginForm.value;
    let action = 'login';
    let param = {};
    // let param = this.loginForm.value;
    // await this.loading.showLoader() ;
    await this.api
      .login(action, param, data)
      .then(async (res) => {
        if (res) {
          let token = res.token;
          let profile = res.user;
          let tasks = res.tasks;

          localStorage.setItem('token', token);
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('tasks', JSON.stringify(tasks));
          
          await this.model.getAllModel();
          this.goHome();
        }
      })
      .catch(async (err) => {
        // await this.loading.hideLoader();
        console.log(err);
        this.presentToast('', err.message);
      });
  }

  async getProfile() {
    // let data = this.loginForm.value;
    let action = `view/users/${this.loginForm.controls.username.value}`;
    let param = {};
    await this.api
      .get(action, param)
      .then((res) => {
        // console.log('Respon Get Profile : ', res);
        if (res.success) {
          localStorage.setItem('profile', JSON.stringify(res.users));
          if (res.users.proyek) {
            localStorage.setItem(
              'user_proyek',
              JSON.stringify(res.users.proyek)
            );
          } else {
            localStorage.setItem('user_proyek', JSON.stringify(''));
          }

          this.goHome();
        }
      })
      .catch((err) => {
        console.log(err);
        this.presentToast(err.request.status, err.request.statusText);
      });
  }

  async presentToast(status, text) {
    const toast = await this.toastController.create({
      message: `${status} ${text}`,
      duration: 2000,
    });
    toast.present();
  }

  goHome() {
    this.navCtrl.navigateForward(['/tabs/presensi']);
  }
}
