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

registerForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	if (validateForm(registerForm)) {
		registerError.textContent = "";

		const response = await fetch("/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: registerForm.username.value,
				email: registerForm.email.value,
				password: registerForm.password.value,
			}),
		});

		const result = await response.json();

		if (response.ok) {
			registerError.style.color = "green";
		} else {
			registerError.style.color = "red";
		}

		registerError.textContent = result.message;
	} else {
		registerError.textContent = "PLEASE COMPLETE ALL FIELDS";
	}
});

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	if (validateForm(loginForm)) {
		loginError.textContent = "";

		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: loginForm.email.value,
				password: loginForm.password.value,
			}),
		});

		const result = await response.json();

		if (response.ok) {
			loginError.style.color = "green";
		} else {
			loginError.style.color = "red";
		}

		loginError.textContent = result.message;
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
