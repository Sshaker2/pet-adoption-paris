const deleteForm = document.querySelector("#delete-form");
const deleteButton = document.querySelector("#delete-button");
const cancelButton = document.querySelector("#cancel-button");


deleteButton.addEventListener("click", handleDeleteForm);
cancelButton.addEventListener("click", handleCancel);

function handleDeleteForm() {
  deleteForm.hidden = !deleteForm.hidden;
  deleteForm.classList.toggle('hide');
}

function handleCancel() {
  deleteForm.classList.toggle('hide');
}
