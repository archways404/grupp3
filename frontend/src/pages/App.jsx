import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [testText, setTestText] = useState('');
	const [msgText, setMsgText] = useState('');

	const handleChangeText = (event) => {
		setTestText(event.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		try {
			const response = await fetch('http://localhost:9999/api/test/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ test: testText }),
			});
			if (response.status === 200) {
				const data = await response.json();
				const testData = data.test;
				console.log(data.test);
				setMsgText(testData);
				toast.success(`${testData}`, {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		} catch (err) {
			console.log(err);
			toast.error('ERROR!', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	return (
		<>
			<ToastContainer />
			<div className="flex justify-center items-center h-screen">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center space-y-4">
					<label className="text-white">Edit Information</label>
					<input
						className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
						placeholder="text"
						type="text"
						value={testText}
						onChange={handleChangeText}
					/>
					<button
						type="submit"
						className="bg-green-500 text-white w-32 rounded-full">
						Submit
					</button>
				</form>
			</div>
		</>
	);
}

export default App;
