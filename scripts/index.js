// Array of initial cards
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "http://127.0.0.1:5501/images/pexels-griffin-wooldridge-4953434 1.png",
  },

  {
    name: "Mint Plant", // A descriptive name for the image
    link: "https://images.unsplash.com/photo-1731921954767-8473de81c99e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form"); // Corrected initialization
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const modalElements = document.querySelectorAll(".modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
// Attach event listener for the close button outside of the function
previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal); // Ensure this function is defined in your code
});
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // Image click event to open the preview modal
  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });

  // Assign name to the title
  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });
  cardDeleteButton.addEventListener("click", handleDeleteCard);
  function handleDeleteCard(evt) {
    cardElement.remove(); // Remove the card from the DOM
  }

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalOnEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeModalOnEsc);
}

function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

// Function to handle form submission and update profile fields
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Prevent the page from reloading
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);
  closeModal(cardModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, settings);
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});
cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", handleAddFormSubmit);

modalElements.forEach((modalElements) => {
  modalElements.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modalElements);
    }
  });
});

// Render initial cards
initialCards.forEach((item) => {
  const cardEl = getCardElement(item);
  cardsList.append(cardEl);
});
