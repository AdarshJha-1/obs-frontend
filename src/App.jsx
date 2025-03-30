import React from "react";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {

	return (
		<div className="flex flex-col min-h-screen bg-gray-900">
			<Header />
			<main className="flex-grow p-6">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default App;
