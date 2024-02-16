# Backend Assignment 1

Skapa en fil externt från github projektet för varje Assignment

Använd följande mall:
```javascript
const express = require('express');
const app = express();
const http = require('http');

const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

// Configuration for the port
const port = 9999;

// Configuration for the express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/getLocation', async (req, res) => {
	const inputValue = req.body.inputValue
	// ER KOD HÄR
	res.status(200).send({ //returnValue: returnValue });
});

http.createServer(app).listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
```

För att skriva en funktion så kan ni använda denna mallen:

``` javascript
async function fName(inputValue) {
	const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (data.length > 0) {
			return { latitude: data, longitude: data };
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}
```

***Instruktioner:***

Ni ska skicka en `inputValue` med en address t.ex stad till funktionen och sedan ska ni returnera kordinaterna `longitude` och `latitude`.

Detta gör ni med postman, genom att göra en post request till `http://localhost:9999/api/getLocation` med `Body` som har `x-www-form-urlencoded` där ni definierar `inputValue`

`Output` ska se ut på följande vis (notera att lat och long kommer vara olika beroende på inputValue):
```JSON
{
    "cordinates": {
        "latitude": "55.6052931",
        "longitude": "13.0001566"
    }
}
```

![App Screenshot](https://cdn.discordapp.com/attachments/750979337079226392/1188540844811235419/image.png?ex=659ae5eb&is=658870eb&hm=12ce33287a6a108de92fd2808bf984fa0dd525794a9428468c0934ec56a31ca6&)