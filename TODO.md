## TODO LIST

***Namn:***
- test
- test
- test
- test
- test

Skriv namn och vilken del ni vill pröva och jobba med :D

## Items QRF

- ***Location Page***
- ***Search Page***
- ***Products Page (Not quite ready yet)***



## Location

### ***backend***

#### ***/backend/dev.js:***

Summary:
- Byte av POST Endpoint
- Byta namn på variabeln som skickas
- Byta namn på variabeln som tas emot
- Skapa en fil för logiken
- Definiera logiken

Base:
```javascript
app.post('/api/test', async (req, res) => {
	const test = req.body.test;
	console.log('Message:', test);
	res.status(200).send({ test: test });
});
```

*****Byte av POST Endpoint:*****

Från:
```javascript
/api/test
```
Till ex:
```javascript
/api/location
```

*****Byta namn på variabeln som skickas*****

Från:
```javascript
res.status(200).send({ test: test });
```
Till ex:
```javascript
res.status(200).send({ cordinates: cordinates });
```

*****Byta namn på variabeln som tas emot*****

Från:
```javascript
const test = req.body.test;
```
Till ex:
```javascript
const location = req.body.location;
```

*****Skapa en fil för logiken*****

Path:
```javascript
backend
- functions
  - yourfile.js
```

*****Definiera logiken för att konvertera stad / address till kordinater*****

Code:

```javascript
async function getCoordinates(address) {
	const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
		address
	)}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (data.length > 0) {
			const returnObject = {
				latitude: data[0].lat,
				longitude: data[0].lon,
			};
			return returnObject;
			//return { latitude: data[0].lat, longitude: data[0].lon };
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}
```

### ***frontend***

#### ***/frontend/src/compontents/Location.jsx:***

Base:
```javascript
const handleLocationSubmit = async (e) => {
	e.preventDefault(); // Prevent default form submission behavior
	try {
	const response = await fetch('http://localhost:9999/api/test/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ test: location }),
	});
	if (response.status === 200) {
		const data = await response.json();
		const testData = data.test;
		setDisplayLocation(false);
		console.log(data.test);
		toast.success(`Message recieved! ${testData}`, {
			position: toast.POSITION.TOP_CENTER,
		});
		// reutrn value to parent
		onDisplayLocationChange(false);
	}
	} catch (err) {
	console.log(err);
	toast.error(`Response from backend: \n ${err}`, {
		position: toast.POSITION.TOP_CENTER,
	});
	}
};
```

*****Byte av POST Endpoint:*****

Från:
```javascript
const response = await fetch('http://localhost:9999/api/test/', {
```
Till samma som backend, ex:
```javascript
const response = await fetch('http://localhost:9999/api/location/', {
```

*****Byta namn på variabeln som skickas*****

Från:
```javascript
body: JSON.stringify({ test: location })
```
Till ex:
```javascript
body: JSON.stringify({ location: location })
```

*****Byta namn på variabeln som tas emot & spara till sessionStorage*****

Från:
```javascript
const data = await response.json();
const testData = data.test;
```
Till ex:
```javascript
const data = await response.json();
sessionStorage.setItem('latitude', data.latitude);
sessionStorage.setItem('longitude', data.longitude);
```


## Search

### ***/backend/dev.js***

Summary:
- Byte av POST Endpoint
- Byta namn på variabeln som skickas
- Byta namn på variabeln som tas emot
- Skapa en fil för logiken
- Definiera logiken

*****Skapa en fil för logiken*****

Path:
```javascript
backend
- functions
  - yourfile.js
```

*****Hämta in datan från databasen:*****

Code:
```javascript
async function viewDatabaseContents() {
	try {
		const allData = await ProductArray.find();
		console.log('Database Contents:', JSON.stringify(allData, null, 2));
	} catch (err) {
		console.error('Error fetching data from the database:', err);
	}
}
```

*****Hantera datan*****

- Skapa en funktion som returnar allt från databasen (obs formattering kan behövas)
- Skapa en funktion som gör så att du kan söka om där finns någon matchning och isåfall returnera en eller flera, annars returnera 404.

Formattering & mapping ex finns i /tests/

Mall för hur datan ska returneras:

```JSON
data: {
	text: text,
	img: img,
	price: price,
	prod_id: prod_id
}
```
