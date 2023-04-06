const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function connect() {
	await client.connect();
	console.log("CONNECTED TO MONGODB");
}

module.exports = { client, connect };
