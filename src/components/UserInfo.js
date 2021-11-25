export default class UserInfo {
  constructor({nameElem, jobElem}) {
    this._nameElem = nameElem;
    this._jobElem = jobElem;
  }

  getUserInfo = () => {
    return {
      name: this._nameElem.textContent,
      job: this._jobElem.textContent,
    };
  }

  setUserInfo(data) {
    this._nameElem.textContent = data.name;
    this._jobElem.textContent = data.about;
  }
}
