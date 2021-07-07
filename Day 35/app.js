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
/* Helpers
/* ==================================================== */

/**
 * Renders the message
 * @param      {object}  element  The element to insert the message
 * @param      {sting}  message  The message to render
 */
function renderMessage(element, message) {
  setTimeout(function () {
    element.textContent = message;
  }, 10);
}

/**
 * Shows the status of the notes
 * @param      {object}  insertAfter  The element to append the new HTML element
 * @param      {string}  message      The message to render
 */
function showStatus(target, message) {
  // Create a notification element
  const notificationElement = document.createElement("div");
  notificationElement.setAttribute("aria-live", "polite");
  target.insertAdjacentElement("afterend", notificationElement);
  // Add the appropriate message
  renderMessage(notificationElement, message);
  // Remove it after 3 seconds
  setTimeout(function () {
    notificationElement.remove();
  }, 3000);
}

/* Library
/* ==================================================== */

/**
 * Removes a note from localStorage
 * @param      {object}  event    The event
 * @param      {object}  element  The element to remove remaining value from
 */
function removeNote(event, element) {
  event.preventDefault();
  // Check if there is a note in localStorage
  if (!localStorage.getItem("Note")) {
    showStatus(form, noNotes);
    return;
  }
  // Remove the note and clear the UI
  localStorage.removeItem("Note");
  element.value = "";
  showStatus(form, removedNote);
}

/**
 * Saves a note to localStorage
 * @param      {object}  event    The event
 * @param      {event}   element  The element containing the value to save
 */
function saveNote(event, element) {
  event.preventDefault();
  // Check if there is a value entered in the element
  if (!element.value.trim()) {
    showStatus(form, emptyNote);
    return;
  }
  // Save the value to localStorage
  localStorage.setItem("Note", element.value.trim());
  showStatus(form, savedNote);
}

/**
 * Checks localStorage and renders any saved notes
 */
function renderSavedNote() {
  if (!localStorage.getItem("Note")) return;
  textarea.value = localStorage.getItem("Note");
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */
// Check for notes on page load
renderSavedNote();
// Listen for save or remove note events
save.addEventListener("click", () => {
  saveNote(event, textarea);
});
remove.addEventListener("click", () => {
  removeNote(event, textarea);
});
