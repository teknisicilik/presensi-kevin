import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AlertController, NavController } from '@ionic/angular';
// import {
//   FileTransfer,
//   FileUploadOptions,
//   FileTransferObject,
// } from "@ionic-native/file-transfer/ngx";

// import { File, FileEntry, IFile } from "@ionic-native/File/ngx";

// import queryString from "query-string";

export interface initOptions {
  version: number;
}

export interface Params {
  [key: string]: any;
}

export interface Body {
  [key: string]: Object;
}

export interface LoginOptions {
  path: string;
  params?: Params;
}

export interface GetOptions {
  path: string;
  params?: Params;
}

export interface ModelOptions {
  path: string;
  // params?: Params;
}

export interface PostOptions {
  path: string;
  body?: Body;
  params?: Params;
  // server: Number;
}

export interface UploadOptions {
  path: string;
  body?: Body;
  server: Number;
  // auth: boolean;
  key?: String;
}

export interface ErrorResponse {
  id: string;
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  public axios: AxiosInstance;
  public errorHandler: ErrorHandler;

  // Ubah menjadi false untuk mendapatkan error respon berbentuk text
  debug: boolean = false;

  constructor(
    private navCtrl: NavController,
    // private transfer: FileTransfer,
    // private file: File,
    private alertCtrl: AlertController
  ) {
    this.errorHandler = this.errorHandler;
    this.axios = axios.create({
      timeout: 30000,
      // baseURL: environment.SERVER_URL,
    });

    // this.interceptor();
  }

  // public interceptor() {
  //   this.axios.interceptors.request.use(
  //     function (config) {
  //       // Do something before request is sent
  //       // console.log(config);
  //       const credentials = JSON.parse(localStorage.getItem("credentials"));
  //       const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  //       if (typeof config.params === "undefined") {
  //         config.params = {};
  //       }

  //       if (environment.SECURITY_MODE === "sso") {
  //         config.headers.authorization =
  //           typeof credentials !== "undefined" && credentials
  //             ? `${credentials.access_token}`
  //             : "";

  //         if (typeof config.params !== "undefined") {
  //           config.params.user_id =
  //             typeof userInfo !== "undefined" && userInfo
  //               ? userInfo.puserId
  //               : 0;
  //         }
  //       } else {
  //         // tslint:disable-next-line:max-line-length
  //         config.headers.authorization =
  //           typeof credentials !== "undefined" && credentials
  //             ? `Bearer ${credentials.access_token.access_token}`
  //             : "";
  //         // config.params.authorization =
  //         //   typeof credentials !== "undefined" && credentials
  //         //     ? `${credentials.sso_access_token}`
  //         //     : "";
  //       }

  //       if (config.params.noauth) {
  //         delete config.headers.authorization;
  //         delete config.params.authorization;
  //         delete config.params.user_id;
  //         delete config.params.noauth;
  //       }

  //       return config;
  //     },
  //     function (error) {
  //       // Do something with request error
  //       return Promise.reject(error);
  //     }
  //   );
  // }

  // public isAuth() {
  //   if (localStorage.getItem("token")) return true;
  //   else return false;
  // }

  public async model(options: GetOptions): Promise<any> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : '',
        // 'accept': '*/*',
      };

      let res = await this.axios.request({
        method: 'GET',
        baseURL: environment.MODEL_URL,
        url: options.path,
        headers: headers,
        // params: options.params,
      });

      return res.data;
    } catch (err) {
      const errData = JSON.parse(JSON.stringify(err));
      return Promise.reject(this.debug ? errData : errData.message);
    }
  }

  public async get(options: GetOptions): Promise<any> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : '',
        // 'accept': '*/*',
      };

      let res = await this.axios.request({
        method: 'GET',
        baseURL: environment.BASE_URL,
        url: options.path,
        headers: headers,
        params: options.params,
      });

      return res.data;
    } catch (err) {
      const errData = JSON.parse(JSON.stringify(err));
      return Promise.reject(this.debug ? errData : errData.message);
    }
  }

  public async post<T>(options: PostOptions): Promise<T> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : '',
      };

      let res = await this.axios.request<T>({
        method: 'POST',
        headers: headers,
        baseURL: environment.BASE_URL,
        url: options.path,
        data: options.body,
        params: options.params,
      });
      return res.data;
    } catch (err) {
      return Promise.reject(this.debug ? err.response : err.response.data);
    }
  }

  public async put<T>(options: PostOptions): Promise<T> {
    try {
      let token = localStorage.getItem('token');
      let headers = {
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : '',
      };

      let res = await this.axios.request<T>({
        method: 'PUT',
        headers: headers,
        baseURL: environment.BASE_URL,
        url: options.path,
        data: options.body,
        params: options.params,
      });
      return res.data;
    } catch (err) {
      return Promise.reject(this.debug ? err.response : err.response.data);
    }
  }

  public async login<T>(options: PostOptions): Promise<T> {
    try {
      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
      };
      var qs = require('qs');
      let data = qs.stringify(options.body);

      let res = await this.axios.request<T>({
        method: 'post',
        headers: headers,
        baseURL: environment.BASE_URL,
        url: options.path,
        data: data,
        // params: options.params,
      });

      return res.data;
    } catch (err) {
      // console.log(err.response)
      // const errData = JSON.parse(JSON.stringify(err));
      return Promise.reject(this.debug ? err.response : err.response.data);
    }
  }

  // public async upload<T>(options: UploadOptions): Promise<any> {
  //   try {
  //     let fileUrl: any = options.body.path;
  //     let name: any = options.body.name;

  //     let url =
  //       options.server == 1
  //         ? environment.SERVER_URL + options.path
  //         : options.server == 2
  //         ? environment.SERVER_URL2 + options.path
  //         : environment.SSO_SERVER_URL + options.path;

  //     let FileUploadOptions: FileUploadOptions = {
  //       fileKey: "file",
  //       fileName: name,
  //       headers: {
  //         authorization: JSON.parse(localStorage.getItem("credentials"))
  //           .access_token.access_token,
  //       },
  //     };

  //     const fileTransfer: FileTransferObject = this.transfer.create();
  //     let res = await fileTransfer.upload(
  //       fileUrl,
  //       url,
  //       FileUploadOptions,
  //       true
  //     );

  //     return JSON.parse(res.response);
  //   } catch (err) {
  //     const errData = JSON.parse(err.body);
  //     return Promise.reject(this.debug ? errData : errData.message);
  //   }
  // }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type,
      });
      formData.append('file', imgBlob, file.name);
      // this.uploadImageData(formData);
      return formData;
    };
    reader.readAsArrayBuffer(file);
  }

  b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
