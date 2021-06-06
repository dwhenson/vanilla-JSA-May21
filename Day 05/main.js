/* ====================================================
   Variables
   ==================================================== */
// const passwordInput = document.querySelector("#new-password");
const passwordInputs = [...document.querySelectorAll("[type='password']")];
const submitButton = document.querySelector("button");

/* ====================================================
   Functions
   ==================================================== */

/**
 * Check if relevant form inputs are a password, if not convert and submit the form
 * @param      {event}  event   The event object
 */
function submitHandler(event) {
	event.preventDefault();
	const form = event.target.closest("form");
	// Get all relevant inputs inside the relevant form
	const inputs = form.querySelectorAll("[type='text']");
	// Convert back to password as needed before form submission
	if (inputs.length >= 1) {
		inputs.forEach(function (input) {
			input.type = "password";
		});
	}
	form.submit();
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
	passwordInputs.forEach(function (passwordInput) {
		// If the checkbox and password input aren't in the same form return
		if (form !== passwordInput.closest("form")) return;
		// If so convert type to show password
		if (event.target.checked) {
			passwordInput.type = "text";
		} else {
			passwordInput.type = "password";
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
	// Get the final input elements
	const lastInputs = document.querySelectorAll("div:last-of-type input");
	// Render the show password checkbox after each final input element
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
submitButton.addEventListener("submit", submitHandler);
