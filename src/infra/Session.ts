import { Injectable } from '@nestjs/common';
import axios from 'axios';
import moment from 'moment';
import CryptoJS from 'crypto-js';

@Injectable()
export class Session {
  private devId: string = process.env.DEV_ID || '';
  private authKey: string = process.env.AUTH_KEY || '';
  private url = process.env.BASE_URL;
  public sessionId: string = '';
  public sessionCreated: Date = new Date();

  constructor() {
    this.sessionId = global.session;
  }

  async createHirezSession() {
    const request = await this.makeRequest(
      'createsession',
      this.devId,
      this.generateSignature('createsession'),
      this.getTimestamp(),
    );
    this.sessionCreated = new Date();
    this.sessionId = request.session_id;
    return request.ret_msg == 'Approved';
  }

  isSessionAlive(): boolean {
    if (
      !this.sessionCreated ||
      this.timeTranscurred(Date.now(), this.sessionCreated.getTime()) >= 15
    )
      return false;
    return true;
  }

  async serverInfo() {
    const request = await this.makeRequest(
      'gethirezserverstatus',
      this.devId,
      this.generateSignature('gethirezserverstatus'),
      this.sessionId,
      this.getTimestamp(),
    );
    return request;
  }

  async patchInfo() {
    const request = await this.makeRequest(
      'getpatchinfo',
      this.devId,
      this.generateSignature('getpatchinfo'),
      this.sessionId,
      this.getTimestamp(),
    );
    return request;
  }

  generateSignature(method: string) {
    const MD5 = CryptoJS.MD5(
      this.devId + method + this.authKey + this.getTimestamp(),
    );
    return MD5;
  }

  getTimestamp(): string {
    return moment.utc().format('YYYYMMDDHHmmss');
  }

  timeTranscurred(time1InMillis: number, time2InMillis: number) {
    const millisTranscurred = Math.abs(time1InMillis - time2InMillis);
    const secondsTranscurred = Number((millisTranscurred / 1000).toFixed());
    const minutesTranscurred =
      secondsTranscurred % 60 === 0
        ? Math.ceil(secondsTranscurred / 60 + 1)
        : Math.ceil(secondsTranscurred / 60);
    return minutesTranscurred;
  }

  async makeRequest(method: string, ...params: any[]) {
    let urlReq = this.url + `${method}json`;
    try {
      params && params.forEach((param) => (urlReq += `/${param}`));
      const res = await axios.get(urlReq);
      return res.data;
    } catch (error) {
      return error;
    }
  }

  public buildParams(method: string, params?: string[]) {
    const staticParams = [this.devId, this.generateSignature(method), this.sessionId, this.getTimestamp()]
    const fullParams =  [...staticParams, params]
    return fullParams
  }

  public getDevId() {
    return this.devId;
  }
}
