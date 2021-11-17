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

  setUserInfo(newName, newJob) {
    this._nameElem.textContent = newName;
    this._jobElem.textContent = newJob;
  }
}
