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
];

// Selecting elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalButton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editFormelement = editModal.querySelector(".modal__form");
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

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button"); // Select the delete button
  //Todo- select the delete button

  const previewModal = document.querySelector("#preview-modal");
  const previewModalImageEl = previewModal.querySelector(".modal__image");
  const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
  const modalElement = document.querySelectorAll(".modal");
  const previewModalCloseBtn = previewModal.querySelector(
    ".modal__close-btn_type_preview"
  );

  previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });
  // Image click event to open the preview modal
  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });

  // Assign name to the title
  cardNameEl.textContent = data.name;

  // Assign values to the image src and alt attributes
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  //todo: set the listener on delete button
  //The handler should remove the card from the DOM
  // Add event listener for the delete button
  cardDeleteButton.addEventListener("click", handleDeleteCard);
  function handleDeleteCard(evt) {
    cardElement.remove(); // Remove the card from the DOM
  }

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });

  return cardElement;
}

// Function to open the modal and populate the fields
function openModal(modal) {
  modal.classList.add("modal_opened");

  // Only populate fields if it's the edit modal
  if (modal === editModal) {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value =
      profileDescription.textContent || "Civil Aviator";
  }
}

// Function to close the modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
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

  // Create a new card element using the provided data
  const cardElement = getCardElement(inputValues);

  // Add the new card element to the top of the card list
  cardsList.prepend(cardElement);

  // Reset the form inputs after submission
  evt.target.reset();

  // Close the modal after the card is added
  closeModal(cardModal);
}

// Event listeners
profileEditButton.addEventListener("click", () => {
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

editFormelement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddFormSubmit); // Corrected event listener

// Render initial cards
initialCards.forEach((item) => {
  const cardEl = getCardElement(item);
  cardsList.append(cardEl);
});
