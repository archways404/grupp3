// Get the current date
let currentDate = new Date();

// Format the date as "YYYYMMDD"
let formattedDate =
	currentDate.getFullYear().toString() +
	('0' + (currentDate.getMonth() + 1)).slice(-2) +
	('0' + currentDate.getDate()).slice(-2);

console.log(formattedDate); // Outputs the current date in "YYYYMMDD" format

// Add 2 days to the current date
currentDate.setDate(currentDate.getDate() + 2);

// Format the new date
let newFormattedDate =
	currentDate.getFullYear().toString() +
	('0' + (currentDate.getMonth() + 1)).slice(-2) +
	('0' + currentDate.getDate()).slice(-2);

console.log(newFormattedDate); // Outputs the new date in "YYYYMMDD" format
