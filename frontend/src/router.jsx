import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route
					path="/"
					element={<Main />}
				/>
			</Routes>
		</HashRouter>
	</React.StrictMode>
);
