let popup = document.querySelector(".popup");
let popupOpenBtn = document.querySelector(".profile__edit-button");
let popupCloseBtn = popup.querySelector(".popup__close-button");
let formElement= document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__subtitle");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_about-self");

function popupToggle() {
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  } else {
    popup.classList.remove("popup_opened");
  }
}

popupOpenBtn.addEventListener("click", popupToggle);
popupCloseBtn.addEventListener("click", popupToggle);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle();
}

formElement.addEventListener("submit", formSubmitHandler);

const initialCards = [
  {
    name: 'Москва',
    link: 'https://a.radikal.ru/a22/2109/b7/62d26e30b190.jpg'
  },
  {
    name: 'Обнинск',
    link: 'https://d.radikal.ru/d15/2109/a8/b7f2f71df658.jpg'
  },
  {
    name: 'Калуга',
    link: 'https://a.radikal.ru/a09/2109/dc/b1d907d4b78e.jpg'
  },
  {
    name: 'Калуга',
    link: 'https://d.radikal.ru/d04/2109/51/e2355534c3b9.jpg'
  },
  {
    name: 'Кижи',
    link: 'https://a.radikal.ru/a30/2109/2c/98ad26f52f62.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://d.radikal.ru/d38/2109/42/790235eb6f84.jpg'
  }
]; 
