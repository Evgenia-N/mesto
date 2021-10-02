const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupEditProfileCloseBtn = popupEditProfile.querySelector(".popup__close-button");

const editProfileForm = popupEditProfile.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_about-self");

const elements = document.querySelector(".elements");
const cardTemplateItem = document.querySelector(".card-template");

const popupAddImage = document.querySelector(".popup_type_add-image");
const popupAddImageForm = popupAddImage.querySelector(".popup__form");
const popupAddImageOpenBtn = document.querySelector(".profile__add-button");
const popupAddImageCloseBtn = popupAddImage.querySelector(".popup__close-button");
const placeInput = popupAddImage.querySelector(".popup__input_type_place");
const urlInput = popupAddImage.querySelector(".popup__input_type_url");

const popupFullscreenImage = document.querySelector(".popup_type_fullscreen");
const popupCloseImageBtn = popupFullscreenImage.querySelector(".popup__close-button");

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

popupEditProfileOpenBtn.addEventListener("click", openProfile);
popupEditProfileCloseBtn.addEventListener("click", () => closePopup(popupEditProfile));
popupAddImageOpenBtn.addEventListener("click", () => openPopup(popupAddImage));
popupAddImageCloseBtn.addEventListener("click", () => closePopup(popupAddImage));

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

editProfileForm.addEventListener("submit", submitEditProfileForm);

function createCard(item) {
  const card = cardTemplateItem.content.cloneNode(true);
  card.querySelector(".elements__photo").src = item.link;
  card.querySelector(".elements__photo").alt = item.alt  || item.name;
  card.querySelector(".elements__title").textContent = item.name;

  card.querySelector(".elements__like-button").addEventListener("click", pressLike);
  card.querySelector(".elements__delete-button").addEventListener("click", deleteCard);
  card.querySelector(".elements__photo").addEventListener("click", clickPopupFullscreen);
  return card;
}

function addCard(evt) {
  evt.preventDefault();

  const cardName = placeInput.value;
  const cardLink = urlInput.value;
  const newCard = createCard({ name: cardName, link: cardLink });

  elements.prepend(newCard);
  closePopup(popupAddImage);
  event.target.reset();
}

popupAddImageForm.addEventListener("submit", addCard);

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

function clickPopupFullscreen(evt) {
  openPopup(popupFullscreenImage);
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");

  popupImage.src = evt.currentTarget.src;
  popupImage.alt = evt.currentTarget.alt;
  popupCaption.textContent = evt.currentTarget.parentElement.querySelector(".elements__title").textContent;
}

popupCloseImageBtn.addEventListener("click", () => closePopup(popupFullscreenImage));
