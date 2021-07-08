/* ====================================================
   Variables
   ==================================================== */
// Elements
const form = document.querySelector("#notebook");
const save = document.querySelector("#save");
const remove = document.querySelector("#remove");
// Messages
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
function showStatus(message) {
  // Create a notification element
  const notificationElement = document.createElement("div");
  notificationElement.setAttribute("aria-live", "polite");
  form.insertAdjacentElement("afterend", notificationElement);
  // Add the appropriate message
  renderMessage(notificationElement, message);
  // Remove it after 3 seconds
  setTimeout(function () {
    notificationElement.remove();
  }, 2000);
}

/*!
 * Serialize all form data into an object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */
function serialize(data) {
  const obj = {};
  for (const [key, value] of data) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

/* Library
/* ==================================================== */

/**
 * Removes a note from localStorage
 * @param      {object}  event    The event
 */
function removeNote(event) {
  event.preventDefault();
  // Check if there is a note in localStorage
  if (!localStorage.getItem("note")) {
    showStatus(noNotes);
    return;
  }
  // Remove the note and clear the UI
  const data = JSON.parse(localStorage.getItem("note"));
  for (const datum in data) {
    // Gets the form element based on the name attribute, and sets its value
    const element = form.querySelector(`[name='${datum}']`);
    element.value = "";
  }
  localStorage.removeItem("note");
  showStatus(removedNote);
}

/**
 * Saves a note to localStorage
 * @param      {object}  event    The event
 */
function saveNote(event) {
  event.preventDefault();
  // Get the form fields and convert to an object
  const formData = serialize(new FormData(form));
  // Check if there is a value entered each form element
  for (const item in formData) {
    // Checks the form element based on the name attribute
    const element = form.querySelector(`[name='${item}']`);
    if (!element.value.trim()) {
      showStatus(form, `Sorry, you have to add some ${item} content`);
      return;
    }
  }
  // Save the object to localStorage as a string
  localStorage.setItem("note", JSON.stringify(formData));
  showStatus(savedNote);
}

/**
 * Checks localStorage and renders any saved notes as needed
 */
function renderSavedNote() {
  // Gets the note saved in localStorage
  const formData = JSON.parse(localStorage.getItem("note"));
  if (!formData) return;
  for (const item in formData) {
    // Gets the form element based on the name attribute, and sets its value
    const element = form.querySelector(`[name='${item}']`);
    element.value = formData[item];
  }
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */
// Check for notes on page load
renderSavedNote();
// Listen for save or remove note events
save.addEventListener("click", saveNote);
remove.addEventListener("click", removeNote);
