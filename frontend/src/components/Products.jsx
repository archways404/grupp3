/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products(props) {
	// Values
	const { onDisplayProductsChange } = props; // Destructure the prop

	const contextClass = {
		success: 'bg-green-700',
		error: 'bg-red-700',
		info: 'bg-gray-700',
		warning: 'bg-orange-500',
		default: 'bg-indigo-700',
		dark: 'bg-white-600 font-gray-300',
	};

	return (
		<>
			<ToastContainer
				toastClassName={({ type }) =>
					contextClass[type || 'dark'] +
					' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
				}
				bodyClassName={() => 'text-sm font-white font-med block p-3'}
				position="bottom-left"
				autoClose={3000}
			/>
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
			</div>
		</>
	);
}

export default Products;
