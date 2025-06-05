import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
	return localStorage.getItem("token") !== "admin";
};

export default function ProtectedRoute({ children }) {
	return isAuthenticated() ? children : <Navigate to='/login' />;
}
