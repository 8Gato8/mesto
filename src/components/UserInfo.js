export class UserInfo {

  constructor({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector).textContent;
    this._userJob = document.querySelector(userJobSelector).textContent;
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName,
      job: this._userJob
    }

    return this._userInfo;
  }

  setUserInfo({ name, job }) {
    this._userName = name;
    this._userJob = job;
  }
}
