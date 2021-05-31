/* ====================================================
   Variables
   ==================================================== */
const form = document.querySelector("form");
const passwordInput = document.querySelector("#password");
const submitButton = document.querySelector("button");

/* ====================================================
   Functions
   ==================================================== */

/**
 * Render HTML that is dependent on JavaScript
 */
function renderPasswordToggle() {
	const toggleControls = document.createElement("label");
	toggleControls.innerHTML = `
		<input type="checkbox" name="show-passwords" id="show-password" />
			Show password
		<span id="visibility-state" class="visually-hidden" aria-live="polite"></span>
		`;
	passwordInput.after(toggleControls);
}

/**
 * Update the password status message for screen readers
 * @param      {object}  element  The element that contains the text message
 */
function updatePasswordStatus(element) {
	if (passwordInput.type === "text") {
		element.textContent = "Your password is visible";
	}
	if (passwordInput.type === "password") {
		element.textContent = "Your password is hidden";
	}
}

/**
 * Toggle the visibility of the password input
 * @param      {event}  event   The event object
 */
function togglePassword(event) {
	if (!event.target.matches("#show-password")) return;
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
	} else {
		passwordInput.type = "password";
	}
	// Get the element that provides status updates for screen readers
	const element = form.querySelector("#visibility-state");
	updatePasswordStatus(element);
}

/**
 * Check if the input is a password and submit the form
 * @param      {event}  event   The event object
 */
function submitHandler(event) {
	event.preventDefault();
	if (passwordInput.type === "text") {
		passwordInput.type = "password";
	}
	form.submit();
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */
renderPasswordToggle();
form.addEventListener("change", togglePassword);
submitButton.addEventListener("click", submitHandler);
