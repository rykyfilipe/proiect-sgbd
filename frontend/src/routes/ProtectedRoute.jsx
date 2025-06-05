import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = async () => {
	const token = localStorage.getItem("token");

	const response = await fetch("http://192.168.1.89:5000/dashboard", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return data.message;
};

export default function ProtectedRoute({ children, route }) {
	const [loading, setLoading] = useState(true);
	const [authorized, setAuthorized] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {
			const role = await isAuthenticated();

			setAuthorized(role === route);
			setLoading(false);
		};
		checkAuth();
	}, []);

	if (loading) return <div>Loading...</div>;

	return authorized ? children : <Navigate to='/' />;
}
