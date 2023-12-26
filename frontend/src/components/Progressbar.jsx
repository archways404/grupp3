import React from 'react';

function ProgressBar({ progress }) {
	return (
		<div className="fixed bottom-0 left-0 w-full bg-gray-200">
			<div
				className="bg-green-500 h-1"
				style={{ width: `${progress}%` }}></div>
		</div>
	);
}

export default ProgressBar;
