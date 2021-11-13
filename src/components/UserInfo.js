export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }
  getUserInfo() {
  /*  const userInfo = {};
  const nameInput = popupEditProfileForm.querySelector(".popup__input_type_name");
  const jobInput = popupEditProfileForm.querySelector(".popup__input_type_about-self");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent; 
  return userInfo;*/
  }

  setUserInfo() {
  this._profileName.textContent = nameInput.value;
  this._profileJob.textContent = jobInput.value;
  }
}
