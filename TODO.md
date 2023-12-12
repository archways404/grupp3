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

## TODO

***1. Location Page:***

```javascript

app.post('/api/test', async (req, res) => {
	const test = req.body.test;
	console.log('Message:', test);
	res.status(200).send({ test: test });
});

```

- Byta POST URL (från /api/test till ex: /api/getLocation) -> både i backend och frontend

- Byta namn på variabeln som skickas (Location.jsx) -> body: JSON.stringify({ test: location }) till ex: body: JSON.stringify({ location: location }),

- Samma ändring måste ske i backend (req.body.location i detta fallet)

- Skapa en ny fil i functions och definera logik för att hämta kordinaterna (logiken finns i /tests/test.js)

- Använd funktionerna som du har definierat (glöm ej att importera functions/ filen)

- Skicka den nya parsade datan som har kordinaterna (tips är att göra det i följande format): locationData: { lon: lon, lat: lat}

- Spara den nya datan i location.jsx med sessionStorage:         sessionStorage.setItem('lon', locationData.lon);                      sessionStorage.setItem('lat', locationData.lat);


*** Search Page: ***

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
Kod för databas (finns i dbtest.js)

- Skicka sökvärdet till ny endpoint (kan vara get) -> nuvarande postar den till /api/test så byta det

- Skapa en ny logic fil för att hantera och filtrera datan

- Skapa funktioner för att hämta data från databasen, parsa den och söka igenom datan

- Två huvudfunktioner (om värdet som kommer från frontend är ex "alla", ska den returna alla värdena från databasen, parsade såklart), annars ska den söka och se om den hittar en produkt eller så som har namnet. Om inga värden hittas kan man returna alla värdena, samt ett litet meddelande kanske? Eller ett 404?

- I frontend så behöver vi returnera värdena vi får till Main.jsx (se Location.jsx eller Search.jsx).

Vi måste få ut:

- namn
- pris
- img (bild)
- prod_id

- I Main.jsx skicka in det värdet eller värdena till "products" där products är en mall som behöver data (kan gå igenom det lite senare när vi är där).

