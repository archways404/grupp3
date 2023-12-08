import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './pages/App.jsx';
import Home from './pages/Home.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/app"
					element={<App />}
				/>
			</Routes>
		</HashRouter>
	</React.StrictMode>
);
