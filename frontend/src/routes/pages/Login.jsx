import { useState } from "react";
import { useNavigate } from "react-router-dom";

//192.168.1.89 : 5000

function Login() {
	const [name, setName] = useState("");
	const [role, setRole] = useState("user");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://192.168.1.89:5000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					password,
					role: role,
				}),
			});

			if (!response.ok) {
				setError("Invalid credentials!");
				return;
			}

			const data = await response.json();
			const { access_token, id } = data;

			const user = {
				name: name,
				id: id,
			};

			localStorage.setItem("token", access_token);
			localStorage.setItem("user_id", id);
			localStorage.setItem("user", JSON.stringify(user));

			navigate(role === "user" ? "/user" : "/delivery");
		} catch (err) {
			console.error("Login error:", err);
			setError("Failed to connect to server.");
		}
	};

	return (
		<div className='w-screen h-screen flex items-center justify-center bg-[#eaeaea]'>
			<form
				onSubmit={handleLogin}
				className='w-[300px] h-[400px] bg-[#eaeaea] rounded-3xl costum-shadow p-6 flex flex-col items-center justify-center gap-4'>
				<h2 className='text-center text-3xl font-semibold mb-10'>
					Autentificare
				</h2>

				{error && (
					<div className='text-red-500 text-sm text-center'>{error}</div>
				)}

				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className='input px-3 py-3'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='input px-3 py-3'
					required
				/>
				<select
					onChange={(e) => setRole(e.target.value)}
					className=''>
					<option
						className='option'
						value='user'>
						User
					</option>
					<option
						className='option'
						value='delivery'>
						Delivery
					</option>
				</select>
				<button
					type='submit'
					className='bg-black text-white px-7 py-2 rounded-3xl hover:bg-white hover:text-black hover:border cursor-pointer transition-all transition-normal'>
					Login
				</button>
				<a
					href='/sign-up'
					className='hover:text-blue-600'>
					Create account
				</a>
			</form>
		</div>
	);
}

export default Login;
