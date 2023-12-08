const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db_password = process.env.DB_PASSWORD;
const db_username = process.env.DB_USERNAME;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.z2qrryy.mongodb.net/?retryWrites=true&w=majority`;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Could not connect to MongoDB...', err));

/*
const messageSchema = new mongoose.Schema({
	name: String,
	text: String,
	color: String,
	timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);
*/
