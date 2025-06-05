import { useState } from "react";
import Add from "../../assets/add.svg";

export default function Curier() {
	const [myOrders, setMyOrders] = useState([]);
	const [orders, setOrders] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [button, setButton] = useState(1);

	const token = localStorage.getItem("token");
	const user = JSON.parse(localStorage.getItem("user"));

	const handleStatusChange = (id, newStatus) => {
		setMyOrders((prev) =>
			prev.map((order) =>
				order.id === id ? { ...order, status: newStatus } : order
			)
		);
	};
	const handleAddOrder = (order) => {
		const exist = myOrders.find((o) => order.id === o.id);

		if (exist) return;

		setMyOrders([...myOrders, order]);
		const newOrders = orders.filter((o) => o.id !== order.id);
		setOrders(newOrders);
	};

	return (
		<div className='w-screen h-screen px-8 py-12 flex flex-col items-center bg-[#f4f4f4] text-[#1a1a1a] font-sans overflow-x-hidden'>
			<div className='w-full flex justify-between'>
				<h1 className='text-4xl font-semibold w-full text-left mb-10'>
					Hello, <span className='font-bold'>{user.name}</span>
				</h1>
				<div className='flex'>
					<button
						onClick={() => setButton(1)}
						className={`${button === 1 && "bg-black text-white"} cursor-pointer rounded-bl-3xl rounded-tl-3xl py-2 border px-2 h-max w-max`}>
						MyOrders
					</button>
					<button
						onClick={() => setButton(2)}
						className={`${button === 2 && "bg-black text-white"} cursor-pointer rounded-br-3xl rounded-tr-3xl py-2 border px-2 h-max w-max`}>
						Take new order
					</button>
				</div>
			</div>
			{button !== 1 ? (
				<div className='w-full max-w-4xl flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 gap-4 overflow-auto'>
					<div className='grid grid-cols-6 text-sm font-medium uppercase text-gray-500 border-b pb-2'>
						<span>ID</span>
						<span>Distance (km)</span>
						<span>Destination</span>
						<span>Client</span>
						<span>Status</span>
					</div>

					{orders.map((order) => (
						<div
							key={order.id}
							className='grid grid-cols-6 py-3 px-4destination : "destination", rounded-xl border border-gray-200 hover:bg-gray-50 transition'>
							<p className='text-gray-800'>{order.id}</p>
							<p className='text-gray-800'>{order.distance}</p>
							<p className='text-gray-800'>{order.destination}</p>
							<p className='text-gray-800'>
								{order.courier.name}
								<br />
								{order.courier.phone}
							</p>

							<p
								className={`font-medium ${
									order.status === "complete"
										? "text-green-600"
										: order.status === "pending"
											? "text-yellow-600"
											: "text-gray-700"
								}`}>
								{order.status}
							</p>
							<button
								className='cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-400 transition'
								aria-label='Logo Button'
								onClick={() => handleAddOrder(order)}>
								<img
									src={Add}
									alt='Logo'
									className='w-5 h-5'
								/>
							</button>
						</div>
					))}
				</div>
			) : (
				<div className='w-full max-w-4xl flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 '>
					<h1 className='text-3xl font-semibold mb-10'>My orders</h1>
					<div className='grid grid-cols-5 text-sm font-medium uppercase text-gray-500 border-b pb-2'>
						<span>ID</span>
						<span>Distance (km)</span>
						<span>Destination</span>
						<span>CLient</span>
						<span>Status</span>
					</div>
					{myOrders.map((order) => (
						<div
							key={order.id}
							className='grid grid-cols-5 py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition'>
							<p className='text-gray-800'>{order.id}</p>
							<p className='text-gray-800'>{order.distance}</p>
							<p className='text-gray-800'>{order.destination}</p>
							<p className='text-gray-800'>
								{order.courier.name}
								<br />
								{order.courier.phone}
							</p>

							<select
								value={order.status}
								onChange={(e) => handleStatusChange(order.id, e.target.value)}
								className={`font-medium rounded px-2 py-1 outline-none border ${
									order.status === "complete"
										? "text-green-600 border-green-400"
										: order.status === "pending"
											? "text-yellow-600 border-yellow-400"
											: "text-gray-700 border-gray-300"
								}`}>
								<option value='created'>created</option>
								<option value='pending'>pending</option>
								<option value='complete'>complete</option>
							</select>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
