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


### Google Travel Partner

#### Placeholder

```http
  GET 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `process.env.GOOGLE` | `string` | **Required**. Token for authorization|

#### Placeholder

```http
  GET 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `process.env.GOOGLE_TRAVEL_PARTNER` | `string` | **Required**. Token for authorization|


### Free Currency

#### Placeholder

```http
  GET 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `process.env.FREE_CURRENCY` | `string` | **Required**. Token for authorization|

#### Placeholder

```http
  GET 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `process.env.FREE_CURRENCY` | `string` | **Required**. Token for authorization|