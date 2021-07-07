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
 * @param      {object}  element  The element to remove remaining value from
 */
function removeNote(event, element) {
  event.preventDefault();
  // Check if there is a note in localStorage
  if (!localStorage.getItem("note")) {
    showStatus(form, noNotes);
    return;
  }
  // Remove the note and clear the UI
  const data = JSON.parse(localStorage.getItem("note"));
  for (const datum in data) {
    // Gets the form element based on the name attribute, and sets its value
    const element = document.querySelector(`[name='${datum}']`);
    element.value = "";
  }
  localStorage.removeItem("note");
  showStatus(form, removedNote);
}

/**
 * Saves a note to localStorage
 * @param      {object}  event    The event
 * @param      {event}   element  The element containing the value to save
 */
function saveNote(event, element) {
  event.preventDefault();
  // Get the form fields and convert to an object
  const data = new FormData(form);
  const serializedData = serialize(data);
  // Check if there is a value entered each form element
  for (const item in serializedData) {
    // Checks the form element based on the name attribute
    const element = document.querySelector(`[name='${item}']`);
    if (!element.value) {
      showStatus(form, `Sorry, you have to add some ${item} content`);
      return;
    }
  }
  // Save the object to localStorage as a string
  localStorage.setItem("note", JSON.stringify(serializedData));
  showStatus(form, savedNote);
}

/**
 * Checks localStorage and renders any saved notes as needed
 */
function renderSavedNote() {
  if (!localStorage.getItem("note")) return;
  // Gets the note saved in localStorage
  const data = JSON.parse(localStorage.getItem("note"));
  for (const datum in data) {
    // Gets the form element based on the name attribute, and sets its value
    const element = document.querySelector(`[name='${datum}']`);
    element.value = data[datum];
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
