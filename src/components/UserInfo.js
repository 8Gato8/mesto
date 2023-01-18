import { profileName, profileJob } from './constants.js';

export class UserInfo {

  constructor({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo() {

    this._userInfo = {
      name: profileName,
      job: profileJob
    }

    return this._userInfo;
  }

  setUserInfo({ name, job }) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }


}
