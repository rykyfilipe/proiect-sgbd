import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
	const [name, setName] = useState("");
	const [role, setRole] = useState("client");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		if (name === "admin" && password === "1234") {
			localStorage.setItem("token", "mock-token");
			if (role === "client") {
				navigate("/user");
			} else {
				navigate("/delivery");
			}
		} else {
			setError("Nume sau parolă greșite.");
		}
	};

	return (
		<div className='w-screen h-screen flex items-center justify-center bg-[#eaeaea]'>
			<form
				onSubmit={handleLogin}
				className='w-[300px] h-[450px] bg-[#eaeaea] rounded-3xl costum-shadow p-6 flex flex-col items-center justify-center gap-4'>
				<h2 className='text-center text-3xl font-semibold mb-10'>
					Creare account
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
				<input
					type='text'
					placeholder='Phone Number'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					className='input px-3 py-3'
					required
				/>
				<select
					onChange={(e) => setRole(e.target.value)}
					className=''>
					<option
						className='option'
						value='client'>
						User
					</option>
					<option
						className='option'
						value='curier'>
						Delivery
					</option>
				</select>
				<button
					type='submit'
					className='bg-black text-white px-7 py-2 rounded-3xl hover:bg-white hover:text-black hover:border cursor-pointer transition-all transition-normal'>
					Create
				</button>
				<a
					href='/'
					className='hover:text-blue-600'>
					Already have an account?
				</a>
			</form>
		</div>
	);
}

export default SignUp;
