/* ====================================================
   Variables
   ==================================================== */
const passwordInput = document.querySelector("#password");
const showPassword = document.querySelector("#show-password");
const submitButton = document.querySelector("button");

/* ====================================================
   Functions
   ==================================================== */
function togglePassword() {
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
	} else {
		passwordInput.type = "password";
	}
}

/* ====================================================
   Inits and Event Listeners
   ==================================================== */
showPassword.addEventListener("change", togglePassword);
