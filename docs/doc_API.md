# API Documentation

# WEB-API
These are meant to only be used by the website. (Cors won't be an issue, but had it been a real product, then cors would limit requests to only come from the website)

## /api/sendLocation

```http
POST -> http://localhost:9999/api/sendLocation
```

INPUT:

| req.body | Description                |
| :-------- | :------------------------- 
|`location` | **Required**. The address (ex "Malmö")|

OUTPUT:
```JSON
{
	"cordinates": {
        "latitude": "55.6052931",
        "longitude": "13.0001566"
    }
}
```
Example:

![sendLocation](https://media.discordapp.net/attachments/1181535338787770408/1193313360603783289/image.png?ex=65ac42ab&is=6599cdab&hm=bf45739abefd5a92274cbdf14bf7f8a11733e4d19b608e3fb52fee0f6f5f1389&=&format=webp&quality=lossless&width=651&height=497)


## /api/Search

```http
POST -> http://localhost:9999/api/Search
```

INPUT:

| req.body | Description                |
| :-------- | :------------------------- 
|`searchValue` | **Required**. The searchValue (ex "Tuborg")|
|`cord_long` | **Required**. Coordinates, spec longitude (ex "13.0001566")|
|`cord_lat` | **Required**. Coordinates, spec latitude (ex "55.6052931")|

OUTPUT:
```JSON
{
    "updatedProducts": [
        {
            "prod_id": "39602",
            "title": "tuborg classic",
            "img": "https://image.prod.iposeninfra.com/bilkaimg.php?pid=39602&imgType=jpeg",
            "price": "19.81"
        },
        {
            "prod_id": "42442",
            "title": "tuborg classic",
            "img": "https://image.prod.iposeninfra.com/bilkaimg.php?pid=42442&imgType=jpeg",
            "price": "6.12"
        },
      ...
```
Example:

![Search](https://cdn.discordapp.com/attachments/1181535338787770408/1193314647860854855/image.png?ex=65ac43de&is=6599cede&hm=2cd7f9d30c8da3a7d848db09839a074388e85a08529e9ac63122a6d1b1984a13&)

## /api/StoreLocation

```http
POST -> http://localhost:9999/api/StoreLocation
```

INPUT:

| req.body | Description                |
| :-------- | :------------------------- 
|`location_longitude` | **Required**. Coordinates, spec longitude (ex "13.0001566")|
|`location_latitude` | **Required**. Coordinates, spec latitude (ex "55.6052931")|

OUTPUT:
```JSON
{
    "closestStore": {
        "city": "Ishøj",
        "country": "DK",
        "extra": null,
        "street": "Ishøj Lille Torv 1",
        "zip": "2635"
    },
    "distance": 40, (KM)
    "costs": 3.17,
    "costsElectric": 2.77
}
```
Example:

![StoreLocation](https://cdn.discordapp.com/attachments/1181535338787770408/1193315527418978505/image.png?ex=65ac44b0&is=6599cfb0&hm=a11fe49043deed6555c875ef8df38f81f1d78a781054e5c2f798ee016f2aedb1&)

# Public-API
These are meant to be used for external requests.

## /api/getLocation

```http
POST -> http://localhost:9999/api/getLocation
```

INPUT:

| req.body | Description                |
| :-------- | :------------------------- 
|`location` | **Required**. The address (ex "Malmö")|

OUTPUT:
```JSON
{
    "Location": "Malmö",
    "Cordinates": {
        "latitude": "55.6052931",
        "longitude": "13.0001566"
    }
}
```
Example:

![getLocation](https://cdn.discordapp.com/attachments/1181535338787770408/1193316503186051172/image.png?ex=65ac4599&is=6599d099&hm=392423a758026437e93220314b63707a9ed68b58d3a1c858155c0cde7ecbf871&)

## /api/apiSearchTest

```http
POST -> http://localhost:9999/api/apiSearchTest
```

INPUT:

| req.body | Description                |
| :-------- | :------------------------- 
|`searchValue` | **Required**. The search-term (ex empty for all products, or "Tuborg" for turborg)|
|`countryName` | **Required**. The country (ex "Sweden")|

OUTPUT:
```JSON
{
    "products": [
        {
            "prod_id": "39602",
            "title": "tuborg classic",
            "price": "203.25 SEK"
        },
        {
            "prod_id": "42442",
            "title": "tuborg classic",
            "price": "62.79 SEK"
        },
        {
            "prod_id": "18644",
            "title": "tuborg classic",
            "price": "21.85 SEK"
        },
      ...
```
Example:

![getLocation](https://cdn.discordapp.com/attachments/1181535338787770408/1193317172668285019/image.png?ex=65ac4638&is=6599d138&hm=5e974a01b4501527ffac78af3c59420b7b376e4f02e8d8f179263c65b6464e3a&)

## /api/getStoreLocation

```http
POST -> http://localhost:9999/api/getStoreLocation
```

INPUT:

| req.body | Description                |
| :-------- | :------------------------- 
|`location` | **Required**. The location (ex "Malmö")|

OUTPUT:
```JSON
{
    "closestStore": {
        "city": "Ishøj",
        "country": "DK",
        "extra": null,
        "street": "Ishøj Lille Torv 1",
        "zip": "2635"
    },
    "distance": "40 km"
}
```
Example:

![getStoreLocation](https://cdn.discordapp.com/attachments/1181535338787770408/1193317560649777233/image.png?ex=65ac4695&is=6599d195&hm=5649ba39d4ef9fe548561f26345218cb6de2c8b92d96a53e29c610bcfe1d7eda&)
