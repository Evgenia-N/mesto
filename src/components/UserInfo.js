export default class UserInfo {
  constructor({nameElem, jobElem, avatar}) {
    this._nameElem = nameElem;
    this._jobElem = jobElem;
    this._avatar = avatar;
  }

  getUserInfo = () => {
    return {
      name: this._nameElem.textContent,
      job: this._jobElem.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._nameElem.textContent = data.name;
    this._jobElem.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
