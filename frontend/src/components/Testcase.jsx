/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

function Testcase() {
	const [buttonShown, setButtonShown] = useState(true);

	// "handleLocationSubmit" hämtar in exempeldatan och sätter den i sessionstorage samt döljer knappen och visar upp er mall.
	// För att hämta in datan kör ni:
	// const testData = sessionStorage.getItem('testData');
	// Sedan ska ni försöka göra upp en mall här som kan rendera ut datan

	const handleLocationSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const response = await fetch('http://localhost:9999/api/Testcase/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ Testcase: Testcase }),
			});
			if (response.status === 200) {
				const data = await response.json();
				const testData = data.testData;
				console.log(testData);
				sessionStorage.setItem('testData', testData);
				setButtonShown(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{buttonShown ? (
				<div className="flex justify-center items-center h-screen bg-slate-700">
					<form
						onSubmit={handleLocationSubmit}
						className="flex flex-col items-center space-y-4">
						<button
							type="submit"
							className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded">
							PUSH
						</button>
					</form>
				</div>
			) : (
				// This is what will be rendered if buttonShown is false
				<div>
					{/* Other content to be rendered when buttonShown is false */}
					<p>Other content goes here</p>
				</div>
			)}
		</>
	);
}

export default Testcase;
