export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo = () => {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
  }

  setUserInfo(newName, newJob) {
    this._nameSelector.textContent = newName;
    this._jobSelector.textContent = newJob;
  }
}
