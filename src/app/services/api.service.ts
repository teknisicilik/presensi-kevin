import { Injectable } from '@angular/core';
import { Api } from '../api';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public api: Api) {}

  public async login(action: string, param: any, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.api
        .login({
          path: `/${action}`,
          params: param,
          body: body,
          // server: 1,
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async model(action: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .model({
          path: `generate/${action}`,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async list(action: string, param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .get({
          path: `/${action}/list`,
          params: param,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async detail(action: string, param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .get({
          path: `/${action}/show`,
          params: param,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async add(action: string, param: any, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .post({
          path: `/${action}/create`,
          params: param,
          body: data,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async get(action: string, param: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.api
        .get({
          path: `/${action}`,
          params: param,
          // server: 1,
        })
        .then(async (res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  public async post(action: string, param: any, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.api
        .post({
          path: `/${action}`,
          params: param,
          body: body,
          // server: 1,
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
}
