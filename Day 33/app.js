/* ====================================================
   Variables
   ==================================================== */
// Elements
const form = document.querySelector("#notebook");
const textarea = document.querySelector("#note");
const save = document.querySelector("#save");
const remove = document.querySelector("#remove");
// Messages
const emptyNote = "You can't save a note with nothing in it. What's the point?";
const savedNote = "Your note has been saved. You can relax.";
const removedNote = "Your note has been removed. I hope you'd done with it.";
const noNotes = "All your notes have been removed.";

/* ====================================================
   Functions
   ==================================================== */

function renderMessage(element, message) {
  setTimeout(function () {
    element.textContent = message;
  }, 10);
}

// Show a status message
function showStatus(message) {
  // Create a notification element
  const notificationElement = document.createElement("div");
  notificationElement.setAttribute("aria-live", "polite");
  form.append(notificationElement);
  renderMessage(notificationElement, message);
  // Remove it after 2 seconds
  setTimeout(function () {
    notificationElement.remove();
  }, 2000);
}

function removeNote() {
  event.preventDefault();
  if (!localStorage.getItem("Note")) {
    showStatus(noNotes);
    return;
  }
  localStorage.removeItem("Note");
  showStatus(removedNote);
}

function renderSavedNote() {
  if (!localStorage.getItem("Note")) return;
  textarea.value = localStorage.getItem("Note");
}

function saveNote(event, element) {
  event.preventDefault();
  const noteContent = element.value.trim();
  if (!noteContent) {
    showStatus(emptyNote);
    return;
  }
  localStorage.setItem("Note", noteContent);
  showStatus(savedNote);
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */

renderSavedNote();
save.addEventListener("click", (event) => {
  saveNote(event, textarea);
});
remove.addEventListener("click", removeNote);
