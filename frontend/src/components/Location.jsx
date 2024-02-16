/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function Location(props) {
	// Values
	const [location, setLocation] = useState('');
	const [cordinates, setCordinates] = useState({});
	const [displayLocation, setDisplayLocation] = useState(true);
	const { onDisplayLocationChange } = props; // Destructure the prop

	const progress = 5;

	function success(pos) {
		var crd = pos.coords;
		sessionStorage.setItem('latitude', crd.latitude);
		sessionStorage.setItem('longitude', crd.longitude);
		setCordinates({ latitude: crd.latitude, longitude: crd.longitude });
		onDisplayLocationChange(false);
	}

	function errors(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	var options = {
		enableHighAccuracy: true,
		timeout: 30000,
		maximumAge: 0,
	};

	const fetchLocation = () => {
		if (navigator.geolocation) {
			navigator.permissions
				.query({ name: 'geolocation' })
				.then(function (result) {
					console.log(result);
					if (result.state === 'granted') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
					} else if (result.state === 'prompt') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
					} else if (result.state === 'denied') {
						navigator.geolocation.getCurrentPosition(success, errors, options);
					}
				});
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	};

	const handleChangeLocation = (event) => {
		setLocation(event.target.value);
	};

	const handleLocationSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const response = await fetch('http://localhost:9999/api/sendLocation/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ location: location }),
			});
			if (response.status === 200) {
				const data = await response.json();
				const cords = data.cordinates;
				setDisplayLocation(false);
				console.log(cords);
				sessionStorage.setItem('latitude', cords.latitude);
				sessionStorage.setItem('longitude', cords.longitude);
				// reutrn value to parent
				onDisplayLocationChange(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="flex justify-center items-center h-screen bg-gray-900">
				{/* Main Container with a More Modern Layout */}
				<div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl">
					<h1 className="text-green-500 text-4xl font-bold mb-6 text-center">
						DK BEER INTERNATIONAL
					</h1>

					{/* Form Container */}
					<form
						onSubmit={handleLocationSubmit}
						className="flex flex-col space-y-4">
						<input
							className="w-full h-12 px-4 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:border-green-500 focus:outline-none"
							placeholder="Enter your location"
							type="text"
							value={location}
							onChange={handleChangeLocation}
						/>
						<div className="flex space-x-3">
							<button
								type="submit"
								className="flex-1 bg-green-600 hover:bg-green-700 hover:font-bold text-black py-2 px-4 rounded-md transition duration-300 ease-in-out">
								Next
							</button>
							<button
								className="flex-1 bg-green-600 hover:bg-green-700 hover:font-bold text-black py-2 px-4 rounded-md transition duration-300 ease-in-out"
								onClick={fetchLocation}>
								Fetch Location
							</button>
						</div>
					</form>
				</div>
			</div>
			<ProgressBar progress={progress} />
		</>
	);

}

export default Location;


