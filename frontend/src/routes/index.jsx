import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Client from "./pages/Client.jsx";
import Curier from "./pages/Curier.jsx";
import SignUp from "./pages/sign-up.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
	{
		path: "/user",
		element: (
			<ProtectedRoute route='user'>
				<Client />
			</ProtectedRoute>
		),
	},
	{
		path: "/delivery",
		element: (
			<ProtectedRoute route='delivery'>
				<Curier />
			</ProtectedRoute>
		),
	},
]);

export default router;
