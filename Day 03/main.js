/* ====================================================
   Variables
   ==================================================== */
const passwordInput = document.querySelector("#new-password");
// const inputs = [....querySelectorAll("[type='password']")];
const submitButton = document.querySelector("button");
let passwordToggle;

/* ====================================================
   Functions
   ==================================================== */

/**
 * Check if the input is a password, if not convert and submit the form
 * @param      {event}  event   The event object
 */
function submitHandler(event) {
	event.preventDefault();
	passwordInput.type = "password";
	event.target.closest("form").submit();
}

/**
 * Update the password status message for screen readers
 * @param      {object}  element  The element that contains the text message
 */
function updatePasswordStatus(event, element) {
	if (event.target.checked) {
		element.textContent = "Your password is visible";
	} else {
		element.textContent = "Your password is hidden";
	}
}

/**
 * Toggle the visibility of the password input
 * @param      {event}  event   The event object
 */
function togglePassword(event) {
	if (!event.target.matches("[type='checkbox']")) return;
	const form = event.target.closest("form");
	const passwordInputs = form.querySelectorAll("input:not(#username, [type='checkbox'])");
	passwordInputs.forEach(function (input) {
		if (event.target.checked) {
			input.type = "text";
		} else {
			input.type = "password";
		}
	});
	// Get the element that updates status for screen readers, and call update
	const element = form.querySelector(".visually-hidden");
	updatePasswordStatus(event, element);
}

/**
 * Render HTML that is dependent on JavaScript
 */
function renderPasswordToggle() {
	const lastInputs = document.querySelectorAll("[data-pre-checkbox]");
	lastInputs.forEach(function (input, index) {
		const toggleControls = document.createElement("label");
		toggleControls.innerHTML = `
			<input type="checkbox" name="show-passwords" id="show-password-${index}" />
				Show password
			<span class="visually-hidden" aria-live="polite"></span>
			`;
		input.after(toggleControls);
	});
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */
renderPasswordToggle();
document.addEventListener("change", togglePassword);
submitButton.addEventListener("click", submitHandler);
