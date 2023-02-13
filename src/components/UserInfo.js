export class UserInfo {

  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {

    this._userInfo = {
      name: this._userName,
      job: this._userJob,
      avatar: this._userAvatar,
    }

    return this._userInfo;
  }

  setUserInfo({ name, job }) {

    this._userName.textContent = name;
    this._userJob.textContent = job;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }

}
