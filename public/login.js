const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const registerForm = document.querySelector(".register form");
const loginForm = document.querySelector(".login form");
const registerError = document.querySelector(".register .error-message");
const loginError = document.querySelector(".login .error-message");

registerLink.addEventListener("click", () => {
	wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
	wrapper.classList.remove("active");
});

registerForm.addEventListener("submit", (e) => {
	e.preventDefault();

	if (validateForm(registerForm)) {
		registerError.textContent = "";
		registerForm.submit();
	} else {
		registerError.textContent = "PLEASE COMPLETE ALL FIELDS";
	}
});

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();

	if (validateForm(loginForm)) {
		loginError.textContent = "";
		loginForm.submit();
	} else {
		loginError.textContent = "PLEASE COMPLETE ALL FIELDS";
	}
});

function validateForm(form) {
	const inputs = form.querySelectorAll("input[required]");
	let valid = true;

	inputs.forEach((input) => {
		if (!input.value.trim()) {
			valid = false;
			input.classList.add("error");
		} else {
			input.classList.remove("error");
		}
	});

	return valid;
}
