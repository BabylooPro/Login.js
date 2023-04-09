const express = require("express");
const bodyParser = require("body-parser");
const { logger, errorHandler } = require("./middleware/middleware");
const port = 3000;
const app = express();
require("dotenv").config();
const { client: dbClient, connect } = require("./db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const helmet = require("helmet");
const crypto = require("crypto");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// MIDDLEWARE
app.use(logger);
app.use(errorHandler);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'none'"],
			fontSrc: ["'self'", "http:", "https:"],
			imgSrc: ["'self'", "data:"],
		},
	})
);

// ROUTES
app.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	const result = await registerUser(username, email, password);

	if (result.success) {
		res.status(200).json(result);
	} else {
		res.status(400).json(result);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const result = await loginUser(email, password);

	if (result.success) {
		res.status(200).json(result);
	} else {
		res.status(400).json(result);
	}
});

// DATABASE
async function registerUser(username, email, password) {
	const usersCollection = dbClient.db("LoginDB").collection("users");
	const existingUser = await usersCollection.findOne({ email });

	if (existingUser) {
		return { success: false, message: "EMAIL IS ALREADY IN USE" };
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds);
	const newUser = { username, email, password: hashedPassword };

	await usersCollection.insertOne(newUser);
	return { success: true, message: "SUCCESSFUL REGISTRATION" };
}

async function loginUser(email, password) {
	const usersCollection = dbClient.db("LoginDB").collection("users");
	const existingUser = await usersCollection.findOne({ email });

	if (!existingUser) {
		return { success: false, message: "THE EMAIL CANNOT BE FOUND" };
	}

	const isPasswordCorrect = await bcrypt.compare(
		password,
		existingUser.password
	);

	if (!isPasswordCorrect) {
		return { success: false, message: "INCORRECT PASSWORD" };
	}

	return { success: true, message: "SUCCESSFUL CONNECTION" };
}

(async () => {
	try {
		await connect();
		app.listen(port, () => {
			console.log(`SERVER LISTEN ON PORT ${port}`);
		});
	} catch (error) {
		console.error("ERROR CONNECTING TO DATABASE : ", error);
	}
})();
