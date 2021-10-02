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

const initialCards = [
  {
    name: "Москва",
    link: " https://i6.imageban.ru/out/2021/10/02/af5fdc41a3586b4c54fbede45ad36eae.jpg",
    alt: "Москва, памятник Минину и Пожарскому на Красной площади.",
  },
  {
    name: "Обнинск",
    link: " https://i1.imageban.ru/out/2021/10/02/2fd9e1b476b773867df375eca69b3e68.jpg",
    alt: "Обнинск, памятник первопроходцам атомной энергетики.",
  },
  {
    name: "Калуга",
    link: " https://i7.imageban.ru/out/2021/10/02/e791f4f60f108aa4a0bd59fcfd3dfbb7.jpg",
    alt: "Калуга, церковь в деревне Никола-Ленивец.",
  },
  {
    name: "Калуга",
    link: " https://i3.imageban.ru/out/2021/10/02/ef11dbecec5a9add3a4df9f4c9aeb16f.jpg",
    alt: "Калуга, арт-объект в деревне Никола-Ленивец.",
  },
  {
    name: "Кижи",
    link: " https://i1.imageban.ru/out/2021/10/02/9ffe54d89dfff790d96d23eb0720726f.jpg",
    alt: "Карелия, Кижский погост.",
  },
  {
    name: "Камчатка",
    link: " https://i6.imageban.ru/out/2021/10/02/b8eef552b63c80d17fa26dba86f91cd9.jpg",
    alt: "Камчатка, памятник 'Медведи', более известный как 'Здесь начинается Россия'.",
  },
];

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupOpenBtn.addEventListener("click", openProfile);
popupCloseBtn.addEventListener("click", () => closePopup(popupEditProfile));
popupAddImageOpen.addEventListener("click", () => openPopup(popupAddImage));
popupAddImageClose.addEventListener("click", () => closePopup(popupAddImage));

function submitForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener("submit", submitForm);

function createCard(item) {
  const card = cardTemplateItem.content.cloneNode(true);
  card.querySelector(".elements__photo").src = item.link;
  card.querySelector(".elements__photo").alt = item.alt  || item.name;
  card.querySelector(".elements__title").textContent = item.name;

  card.querySelector(".elements__like-button").addEventListener("click", pressLike);
  card.querySelector(".elements__delete-button").addEventListener("click", deleteCard);
  card.querySelector(".elements__photo").addEventListener("click", popupFullscreen);
  return card;
}

function addCard(evt) {
  evt.preventDefault();

  const cardName = evt.currentTarget.querySelector(".popup__input_type_place").value;
  const cardLink = evt.currentTarget.querySelector(".popup__input_type_url").value;
  const newCard = createCard({ name: cardName, link: cardLink });

  elements.prepend(newCard);
  closePopup(popupAddImage);
  event.target.reset();
}

containerElement.addEventListener("submit", addCard);

function addInitialCard(item) {
  const initialCard = createCard(item);
  elements.append(initialCard);
}

initialCards.map(addInitialCard);

function deleteCard(evt) {
  const elementsCard = evt.currentTarget.closest(".elements__card");
  elementsCard.remove();
}

function pressLike(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

function popupFullscreen(evt) {
  openPopup(popupFullscreenImage);
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");

  popupImage.src = evt.currentTarget.src;
  popupImage.alt = evt.currentTarget.alt;
  popupCaption.textContent = evt.currentTarget.parentElement.querySelector(".elements__title").textContent;
}

popupCloseImageBtn.addEventListener("click", () => closePopup(popupFullscreenImage));
