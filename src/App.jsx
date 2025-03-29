import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./auth/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	}, [dispatch]);

	if (loading) return null;

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
