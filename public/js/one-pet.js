// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("pet-adoption-paris JS imported successfully!");
});

const deleteForm = document.querySelector("#delete-form");
const deleteButton = document.querySelector("#delete-button");
const cancelButton = document.querySelector("#cancel-button");


deleteButton.addEventListener("click", handleDeleteForm);
cancelButton.addEventListener("click", handleCancel);

function handleDeleteForm() {
  deleteForm.hidden = !deleteForm.hidden;
}

function handleCancel() {
  deleteForm.hidden = true;
}


