export const popupEditProfile = document.querySelector(".popup_type_edit-profile");
export const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
export const popupEditProfileOpenBtn = document.querySelector(".profile__edit-button");
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__subtitle");
export const nameInput = popupEditProfileForm.querySelector(".popup__input_type_name");
export const jobInput = popupEditProfileForm.querySelector(".popup__input_type_about-self");

export const popupAddImage = document.querySelector(".popup_type_add-image");
export const popupAddImageForm = popupAddImage.querySelector(".popup__form");
export const popupAddImageOpenBtn = document.querySelector(".profile__add-button");
export const placeInput = popupAddImage.querySelector(".popup__input_type_place");
export const urlInput = popupAddImage.querySelector(".popup__input_type_url");
export const popupFullscreenImage = document.querySelector(".popup_type_fullscreen");
export const popupImage = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");

export const initialCards = [
  {
    place: "Москва",
    link: " https://i6.imageban.ru/out/2021/10/02/af5fdc41a3586b4c54fbede45ad36eae.jpg",
    alt: "Москва, памятник Минину и Пожарскому на Красной площади.",
  },
  {
    place: "Обнинск",
    link: " https://i1.imageban.ru/out/2021/10/02/2fd9e1b476b773867df375eca69b3e68.jpg",
    alt: "Обнинск, памятник первопроходцам атомной энергетики.",
  },
  {
    place: "Калуга",
    link: " https://i7.imageban.ru/out/2021/10/02/e791f4f60f108aa4a0bd59fcfd3dfbb7.jpg",
    alt: "Калуга, церковь в деревне Никола-Ленивец.",
  },
  {
    place: "Калуга",
    link: " https://i3.imageban.ru/out/2021/10/02/ef11dbecec5a9add3a4df9f4c9aeb16f.jpg",
    alt: "Калуга, арт-объект в деревне Никола-Ленивец.",
  },
  {
    place: "Кижи",
    link: " https://i1.imageban.ru/out/2021/10/02/9ffe54d89dfff790d96d23eb0720726f.jpg",
    alt: "Карелия, Кижский погост.",
  },
  {
    place: "Камчатка",
    link: " https://i6.imageban.ru/out/2021/10/02/b8eef552b63c80d17fa26dba86f91cd9.jpg",
    alt: "Камчатка, памятник 'Медведи', более известный как 'Здесь начинается Россия'.",
  },
];