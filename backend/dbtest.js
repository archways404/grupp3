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
  
const arraySchema = new mongoose.Schema({
	products: [
		{
			prod_id: String,
			title: String,
			img: String,
			price: Number,
		},
	],
});

const ProductArray = mongoose.model('ProductArray', arraySchema);

async function viewDatabaseContents() {
	try {
		const allData = await ProductArray.find();
		console.log('Database Contents:', JSON.stringify(allData, null, 2));
	} catch (err) {
		console.error('Error fetching data from the database:', err);
	}
}

viewDatabaseContents();

