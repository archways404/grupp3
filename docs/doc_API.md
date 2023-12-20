# API Documentation

### Salling

#### Product Suggestions (search)

```http
  GET https://api.sallinggroup.com/v1-beta/product-suggestions/relevant-products?query=${SEARCH_QUERY}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `SEARCH_QUERY` | `string` | **Required**. The search query (ex "Corona")|
| `process.env.SALLING_BEARER_TOKEN` | `string` | **Required**. Bearer token for authorization|

#### Stores

```http
  GET https://api.sallinggroup.com/v2/stores
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `process.env.SALLING_BEARER_TOKEN` | `string` | **Required**. Bearer token for authorization|


### Free Currency

#### Placeholder

```http
  GET https://api.freecurrencyapi.com/v1/latest?apikey=${FREE_CURRENCY_KEY}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `process.env.FREE_CURRENCY_KEY` | `string` | **Required**. Key for authorization|

### Nominatim OpenStreetMap

#### Placeholder

```http
  GET https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `address` | `string` | **Required**. The address of the user|

### GeoCode

#### Placeholder

```http
  GET https://geocode.maps.co/reverse?lat={latitude}&lon={longitude}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `latitude` | `string` | **Required**. The latitude of the user|
| `longitude` | `string` | **Required**. The longitude of the user|


### RestCountries

#### Placeholder

```http
  GET https://restcountries.com/v3.1/name/${countryName}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `countryName` | `string` | **Required**. The name of the country |

### SkyScanner

#### Placeholder

```http
  GET https://developers.skyscanner.net/docs/geo/overview
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `process.env.` | `string` | **Required**. Key for authorization|