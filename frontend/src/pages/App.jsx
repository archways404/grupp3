/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [testText, setTestText] = useState('');
	const [msgText, setMsgText] = useState('');

	const handleChangeText = (event) => {
		setTestText(event.target.value);
	};

	const contextClass = {
		success: 'bg-green-700',
		error: 'bg-red-700',
		info: 'bg-gray-700',
		warning: 'bg-orange-500',
		default: 'bg-indigo-700',
		dark: 'bg-white-600 font-gray-300',
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
				toast.success(`Response from backend: ${testData}`, {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		} catch (err) {
			console.log(err);
			toast.error(`Response from backend: \n ${err}`, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	return (
		<>
			<div className="flex justify-center items-center h-screen bg-slate-700">
				<ToastContainer
					toastClassName={({ type }) =>
						contextClass[type || 'dark'] +
						' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
					}
					bodyClassName={() => 'text-sm font-white font-med block p-3'}
					position="bottom-left"
					autoClose={3000}
				/>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center space-y-4">
					<input
						className="w-64 h-12 px-4 rounded-md bg-slate-800 text-gray-200"
						placeholder="text -> backend"
						type="text"
						value={testText}
						onChange={handleChangeText}
					/>
					<br></br>
					<button
						type="submit"
						className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
						Send to backend
					</button>
				</form>
			</div>
		</>
	);
}

export default App;
