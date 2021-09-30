const initialCards = [
  {
    name: "Москва",
    link: "https://a.radikal.ru/a22/2109/b7/62d26e30b190.jpg",
    alt: "Москва, памятник Минину и Пожарскому на Красной площади.",
  },
  {
    name: "Обнинск",
    link: "https://d.radikal.ru/d15/2109/a8/b7f2f71df658.jpg",
    alt: "Обнинск, памятник первопроходцам атомной энергетики.",
  },
  {
    name: "Калуга",
    link: "https://a.radikal.ru/a09/2109/dc/b1d907d4b78e.jpg",
    alt: "Калуга, церковь в деревне Никола-Ленивец.",
  },
  {
    name: "Калуга",
    link: "https://d.radikal.ru/d04/2109/51/e2355534c3b9.jpg",
    alt: "Калуга, арт-объект в деревне Никола-Ленивец.",
  },
  {
    name: "Кижи",
    link: "https://a.radikal.ru/a30/2109/2c/98ad26f52f62.jpg",
    alt: "Карелия, Кижский погост.",
  },
  {
    name: "Камчатка",
    link: "https://d.radikal.ru/d38/2109/42/790235eb6f84.jpg",
    alt: "Камчатка, памятник 'Медведи', более известный как 'Здесь начинается Россия'.",
  },
];

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupOpenBtn = document.querySelector(".profile__edit-button");
const popupCloseBtn = popupEditProfile.querySelector(".popup__close-button");

const formElement = document.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_about-self");

const elements = document.querySelector(".elements");
const cardTemplateItem = document.querySelector(".card-template");
const popupAddImage = document.querySelector(".popup_type_add-image");
const containerElement = document.querySelector(".popup__container_type_add-image");
const popupAddImageOpen = document.querySelector(".profile__add-button");
const popupAddImageClose = popupAddImage.querySelector(".popup__close-button");

const popupFullscreenImage = document.querySelector(".popup_type_fullscreen");
const popupCloseImageBtn = popupFullscreenImage.querySelector(".popup__close-button");

function popupToggle() {
  if (!popupEditProfile.classList.contains("popup_opened")) {
    popupEditProfile.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  } else {
    popupEditProfile.classList.remove("popup_opened");
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupToggle();
}

function createCard(item) {
  const card = cardTemplateItem.content.cloneNode(true);
  card.querySelector(".elements__photo").src = item.link;
  card.querySelector(".elements__photo").alt = item.alt;
  card.querySelector(".elements__title").textContent = item.name;
  card.querySelector(".elements__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__like-button_active");
    });
  card.querySelector(".elements__delete-button").addEventListener("click", deleteCard);
  card.querySelector(".elements__photo").addEventListener("click", popupFullscreen);
  elements.prepend(card);
}

initialCards.reverse();
initialCards.map(createCard);

function popupImageToggle() {
  if (!popupAddImage.classList.contains("popup_opened")) {
    popupAddImage.classList.add("popup_opened");

  } else {
    popupAddImage.classList.remove("popup_opened");
  }
}

function addCard(evt) {
  evt.preventDefault();

  const addCard = {};
  addCard.name = evt.currentTarget.querySelector(".popup__input_type_place").value;
  addCard.link = evt.currentTarget.querySelector(".popup__input_type_url").value;

  createCard(addCard);
  popupImageToggle();

  evt.currentTarget.querySelector(".popup__input_type_place").value = "";
  evt.currentTarget.querySelector(".popup__input_type_url").value = "";
}

function deleteCard(evt) {
  const elementsCard = evt.currentTarget.closest(".elements__card");
  elementsCard.remove();
}

function popupFullscreen(evt) {
  popupFullscreenImage.classList.add("popup_opened");
  popupFullscreenImage.querySelector(".popup__image").src = evt.currentTarget.src;
  popupFullscreenImage.querySelector(".popup__image").alt = evt.currentTarget.alt;
  popupFullscreenImage.querySelector(".popup__caption").textContent = evt.currentTarget.parentElement.querySelector(".elements__title").textContent;
}

function closeImage() {
  popupFullscreenImage.classList.remove("popup_opened");
}

popupOpenBtn.addEventListener("click", popupToggle);
popupCloseBtn.addEventListener("click", popupToggle);
popupAddImageOpen.addEventListener("click", popupImageToggle);
popupAddImageClose.addEventListener("click", popupImageToggle);
containerElement.addEventListener("submit", addCard);
formElement.addEventListener("submit", formSubmitHandler);
popupCloseImageBtn.addEventListener("click", closeImage);
